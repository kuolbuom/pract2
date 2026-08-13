import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

// Mock network layer so store actions can be tested deterministically.
vi.mock('./services/notes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
  }
}))

import noteService from './services/notes'
import useNoteStore, { useNotes, useFilter, useNoteActions } from './store'

beforeEach(() => {
  // Reset shared Zustand state between tests to prevent cross-test leakage.
  useNoteStore.setState({ notes: [], filter: '' })
  vi.clearAllMocks()
})

// Verify async store actions update state correctly.
describe('useNoteActions', () => {
  it('initialize loads notes from service', async () => {
    // Arrange: service returns a known note list.
    const mockNotes = [{ id: 1, content: 'Test', important: false }]
    noteService.getAll.mockResolvedValue(mockNotes)

    const { result } = renderHook(() => useNoteActions())

    // Act: run initialize action.
    await act(async () => {
      await result.current.initialize()
    })

    // Assert: store notes match loaded service data.
    const { result: notesResult } = renderHook(() => useNotes())
    expect(notesResult.current).toEqual(mockNotes)
  })

  it('add appends a new note', async () => {
    // Arrange: service resolves with created note.
    const newNote = { id: 2, content: 'New note', important: false }
    noteService.createNew.mockResolvedValue(newNote)

    const { result } = renderHook(() => useNoteActions())

    // Act: add a note through actions.
    await act(async () => {
      await result.current.add('New note')
    })

    // Assert: created note is present in state.
    const { result: notesResult } = renderHook(() => useNotes())
    expect(notesResult.current).toContainEqual(newNote)
  })

  it('toggleImportance flips important flag', async () => {
    // Arrange: seed one non-important note and mock updated response.
    const note = { id: 1, content: 'Test', important: false }
    useNoteStore.setState({ notes: [note] })
    noteService.update.mockResolvedValue({ ...note, important: true })

    const { result } = renderHook(() => useNoteActions())

    // Act: toggle note importance by id.
    await act(async () => {
      await result.current.toggleImportance(1)
    })

    // Assert: importance flag is updated in state.
    const { result: notesResult } = renderHook(() => useNotes())
    expect(notesResult.current[0].important).toBe(true)
  })
})

// Verify selector-style filtering behavior from useNotes.
describe('useNotes filtering', () => {
  const notes = [
    { id: 1, content: 'A', important: true },
    { id: 2, content: 'B', important: false },
  ]

  beforeEach(() => {
    // Re-seed note list for each filtering scenario.
    useNoteStore.setState({ notes })
  })

  it('returns all notes with no filter', () => {
    // Default filter should include every note.
    const { result } = renderHook(() => useNotes())
    expect(result.current).toHaveLength(2)
  })

  it('filters important notes', () => {
    // Only important notes should be returned.
    useNoteStore.setState({ notes, filter: 'important' })
    const { result } = renderHook(() => useNotes())
    expect(result.current).toEqual([notes[0]])
  })

  it('filters nonimportant notes', () => {
    // Only non-important notes should be returned.
    useNoteStore.setState({ notes, filter: 'nonimportant' })
    const { result } = renderHook(() => useNotes())
    expect(result.current).toEqual([notes[1]])
  })
})