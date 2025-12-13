import Navbar from "@/components/Navbar"

interface props{
    children:React.ReactElement
}

export default function NavLayout({children}:props) {
  return (
    <>
        <Navbar />
        {children}
    </>
  )
}
