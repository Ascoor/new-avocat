import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LandingPage: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
    <h1 className="text-3xl font-bold">Welcome to Avocat</h1>
    <div className="flex gap-4">
      <Button asChild>
        <Link to="/login">Login</Link>
      </Button>
      <Button asChild variant="outline">
        <Link to="/register">Register</Link>
      </Button>
    </div>
  </div>
);

export default LandingPage;
