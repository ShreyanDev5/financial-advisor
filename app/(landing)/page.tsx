import HomeContent from "@/components/landing/home";
import Partners from "@/components/landing/partners";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <>
      <HomeContent />
      <Separator className="w-1/2 mx-auto mt-16" />
      <Partners />
    </>
  );
}