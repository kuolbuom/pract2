import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Note from '../src/components/Note'
import NoteForm from '../src/components/NoteForm'
import Togglable from '../src/components/Togglable'

describe('<Togglable />', () => {
  beforeEach(() => {
    // Render the component before each test in this block
    // so every test starts from the same initial state.
    render(
      <Togglable buttonLabel="show...">
        <div>togglable content</div>
      </Togglable>
    )
  })

  test('renders its children', () => {
    // Check that the child content exists in the DOM.
    // This does not mean it is visible yet.
    screen.getByText('togglable content')
  })

  test('at start the children are not displayed', () => {
    // Find the child content first.
    const element = screen.getByText('togglable content')

    // Verify that the content is hidden initially.
    expect(element).not.toBeVisible()
  })

  test('after clicking the button, children are displayed', async () => {
    // userEvent simulates real user interaction.
    const user = userEvent.setup()

    // Find the button that opens the toggled content.
    const button = screen.getByText('show...')

    // Simulate a user click on the button.
    await user.click(button)

    // After the click, the hidden content should be visible.
    const element = screen.getByText('togglable content')
    expect(element).toBeVisible()
  })

  test('toggled content can be closed', async () => {
    // Prepare user interaction for this test.
    const user = userEvent.setup()

    // Open the toggled content first.
    const button = screen.getByText('show...')
    await user.click(button)

    // Find the cancel button shown in the open state.
    const closeButton = screen.getByText('cancel')

    // Click cancel to hide the content again.
    await user.click(closeButton)

    // Confirm the content is hidden after closing.
    const element = screen.getByText('togglable content')
    expect(element).not.toBeVisible()
  })

  test('<NoteForm /> updates parent state and calls onSubmit', async () => {
    // Mock the parent callback so we can inspect how it was called.
    const createNote = vi.fn()

    // Prepare user interaction.
    const user = userEvent.setup()

    // NoteForm uses navigation internally, so the test must render it
    // inside a Router context.
    render(
      <MemoryRouter>
        <NoteForm createNote={createNote} />
      </MemoryRouter>
    )

    // Get the form input and the submit button.
    const input = screen.getByRole('textbox')
    const sendButton = screen.getByText('save')

    // Type text into the input like a user would.
    await user.type(input, 'testing a form...')

    // Submit the form.
    await user.click(sendButton)

    // The parent callback should be called once.
    expect(createNote.mock.calls).toHaveLength(1)

    // The first argument of the first call should contain the typed content.
    expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
  })
})

test('clicking the button calls event handler once', async () => {
  // Create a note object that will be passed to the component.
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  // Mock the click handler to verify how many times it runs.
  const mockHandler = vi.fn()

  // Render the note inside a Router because Note uses router hooks.
  render(
    <MemoryRouter>
      <Note note={note} toggleImportance={mockHandler} />
    </MemoryRouter>
  )

  // Prepare user interaction and find the importance button.
  const user = userEvent.setup()
  const button = screen.getByText('make not important')

  // Simulate clicking the button.
  await user.click(button)

  // The handler should run exactly once.
  expect(mockHandler.mock.calls).toHaveLength(1)
})

test('renders content', () => {
  // Build a note object with text we expect to see.
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  // Render the component inside a Router because Note uses router hooks.
  render(
    <MemoryRouter>
      <Note note={note} />
    </MemoryRouter>
  )

  // Look for the note text. exact: false is used because
  // the component renders additional text around the content.
  const element = screen.getByText(
    'Component testing is done with react-testing-library',
    { exact: false }
  )

  // Confirm the note text is present in the document.
  expect(element).toBeInTheDocument()
})
