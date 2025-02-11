import HeaderComponent from "@/components/home/HeaderComponent";
import HeroSection from "@/components/home/HeroSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main
      className=" pb-10 gap-2 flex flex-col items-center justify-center 
    transition-all duration-300 ease-in-out"
    >
      {/* header */}
      <HeaderComponent />
      {/* hero section */}
      <HeroSection />

      {/* others */}
      <h2 className="text-2xl font-bold">Bienvenue, sur Servi Toons</h2>
      <p className="max-w-sm text-pretty">
        Meilleure application pour lire vos mangas, light novels et web comics
        préférés.
      </p>
      <Button asChild className="mt-2">
        <Link href={"/connexion"}>Connexion</Link>
      </Button>
    </main>
  );
}
