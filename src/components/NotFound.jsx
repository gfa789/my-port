import { Link } from 'react-router-dom';
export default function NotFound() {
  return <main className="min-h-screen bg-sagegreen text-puce p-8 flex flex-col items-center justify-center gap-6">
    <p>404</p><h1 className="text-4xl font-bold">This page could not be found.</h1>
    <p>The link may have changed. You can explore my work from the portfolio.</p>
    <Link to="/" className="underline">Back to portfolio</Link>
  </main>;
}
