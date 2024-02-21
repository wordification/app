import { Link, routes } from '@redwoodjs/router'

// const SORTING_MENU_ITEMS = [
//   {
//     title: 'New Game',
//     content: 'Start a new game',
//     to: routes.buildingGameSetup(),
//   },
//   {
//     title: 'Resume Game',
//     content: 'Resume a game in progress',
//     to: routes.buildingGameIncomplete(),
//   },
//   {
//     title: 'Completed Games',
//     content: 'View completed games',
//     to: routes.buildingGameComplete(),
//   },
// ] as const

const BuildingMenuPage = () => {
  return <h1>test</h1>
}

// const SortingMenuPage = () => {
//   return (
//     <>
//       <h1 className="text-xl font-bold">Sorting Game</h1>
//       <ul className="grid gap-4 sm:grid-cols-3">
//         {SORTING_MENU_ITEMS.map((item) => (
//           <Link
//             to={item.to}
//             key={item.to}
//             className="card shadow-lg hover:shadow-xl"
//           >
//             <li className="card-body">
//               <h3 className="card-title">{item.title}</h3>
//               <p>{item.content}</p>
//             </li>
//           </Link>
//         ))}
//       </ul>
//     </>
//   )
// }

export default BuildingMenuPage
