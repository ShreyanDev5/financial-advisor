import HomeContent from "@/components/landing/home";
import Partners from "@/components/landing/partners";
 

export default function Page() {
  return (
    <>
      <HomeContent />
      <div className="w-2/3 sm:w-1/2 md:w-1/3 mx-auto mt-12 sm:mt-16">
        <div className="h-px w-full bg-gray-200 dark:bg-gray-800" />
      </div>
      <Partners />
    </>
  );
}