import React from 'react'

const Persons = ({filterData}) => {
  return (
    <div>
       {filterData.map(person => 
        <p 
         key={person.id}> {person.name}  {person.number}
        </p>
       )}
    </div>
  )
}

export default Persons
