import ResponseList from "./components/response-list.jsx"

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Response Reports</h1>
      <ResponseList />
    </div>
  )
}
