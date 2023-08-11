import { useEffect, useState, useMemo, useRef } from "react"
import {  SortBy, type User } from "./types.d"
import { UsersList } from "./components/UsersList"
import { getAllUsers } from './services/getAllUsers'
import './App.css'
function App() {

  const [users, setUsers] = useState<User[]>([])       // --> usuarios
  const [showColors, setShowColors] = useState(false)  // --> color entre gillas
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)  // --> ordenar por pais
  const [filteredCountry, setFilteredCountry] = useState<string | null>(null)  // --> buscar por pais

  const originalUsers = useRef<User[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getAllUsers()
        setUsers(usersData.results)
        originalUsers.current = usersData.results
      } catch ( err) {
        console.log(err)
      }
    }
    fetchData()
  },[])

  const toggleColors = () => {
    setShowColors(!showColors)
  }
  const toggleSortCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }
  
  const handleDelete = (email: string) => {
    const filteredUsers = users.filter(user => user.email !== email)
    setUsers(filteredUsers) 
  }
  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  // FILTRADO 
  const filteredUsers = useMemo(() => {
    return filteredCountry
    ? users.filter(user => {
      return user.location.country.toLocaleLowerCase().includes(filteredCountry.toLowerCase())
    })
    : users
  }, [users, filteredCountry])

  // ORDENAMIENTO
  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredUsers, sorting])

  return (
    <>
      <h1>Prueba Tecnica - React / Typescript</h1>
      <header>
        <button type="button" onClick={toggleColors}>Colorear Filas</button>
        <button type="button" onClick={toggleSortCountry}>Ordenar por país</button>
        <button type="button" onClick={handleReset}>Restaurar usuarios</button>
        <input type="text" placeholder="filtra por país" onChange={(e) => setFilteredCountry(e.target.value)}/>
      </header>
      <main>
        <UsersList changeSorting={handleChangeSort} deleteUser={handleDelete} showColors={showColors} users={sortedUsers}/>
      </main>
    </>
  )
}

export default App
