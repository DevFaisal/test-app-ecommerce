import Container from "@/components/Container";
import { AspectRatio } from "@/components/ui/aspect-ratio";

function HomePage() {
  return (
    <Container>
      <AspectRatio>
        <div className="absolute flex flex-col justify-center items-center w-screen h-screen">
          <h1 className="text-5xl font-bold bg-primary-foreground p-2 rounded-xl">
            Web App | Faisal
          </h1>
        </div>
        <img
          src="https://images.unsplash.com/photo-1604145195376-e2c8195adf29?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Image"
          className="rounded-md object-cover"
        />
      </AspectRatio>
    </Container>
  );
}

export default HomePage;
