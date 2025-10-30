import Link from "next/link";


export default function Footer() {
  return (
   <footer className="mt-8 mb-8 text-xs text-center text-gray-500 dark:text-gray-400">
          Built by <strong>VINOD</strong> • <Link className="underline" href={"https://www.linkedin.com/in/vinod-tanwar-853976179/"} >Linkedin</Link>
        </footer>
  );
}
