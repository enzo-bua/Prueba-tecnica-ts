import { SortBy, type User } from '../types.d'

interface Props {
  changeSorting: (sort: SortBy) => void
  deleteUser: (email: string) => void
  showColors: boolean
  users: User[]
}

export function UsersList({  changeSorting, deleteUser, showColors, users }: Props) {
  return (
    <table width='100%'>
      <thead>
        <tr>
          <th>Foto</th>
          <th className='th' onClick={() => {changeSorting(SortBy.NAME)}}>Nombre</th>
          <th className='th' onClick={() => {changeSorting(SortBy.LAST)}}>Apellido</th>
          <th className='th' onClick={() => {changeSorting(SortBy.COUNTRY)}}>Pais</th>
          <th>Accines</th>
        </tr>
      </thead>

      <tbody className={showColors ? 'table--showColors' : 'table'}>
        {
          users.map((user) => {
            return (
              <tr key={user.email}>
                <td>
                  <img src={user.picture.thumbnail} alt="" />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button type='submit' onClick={() => {deleteUser(user.email)}}>Delete</button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}
