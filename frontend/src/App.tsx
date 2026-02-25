import Message from "./message"

function App() {
  const name = 'Jadon';
  if (name) {
    return name
  }
  return <div>Hello {name}</div>
}

export default App;