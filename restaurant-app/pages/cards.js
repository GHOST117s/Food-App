import Link from 'next/link'


const cards = () => {
  return (
<div>
  <section className="text-gray-600 body-font mt-9" >
    <div className="container px-2 py-4 mx-auto"> 
      <div className="flex flex-wrap -m-2"> 
        <Link href="/productpage" className="group relative block overflow-hidden w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"> 
          <button className="absolute right-2 top-2 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
           
          </button>
          <img src="" alt="food Image" className="h-20 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-32"/> 
          <div className="relative border border-gray-100 bg-white p-2"> 
           
            <h3 className="mt-2 text-sm font-medium text-gray-900">foodName</h3> 
            <p className="mt-1 text-xs text-gray-700">food Price</p> 
            <form className="mt-2">
              <button className="block w-full rounded bg-yellow-400 p-2 text-xs font-medium transition hover:scale-105"> 
                Add to Cart
              </button>
            </form>
          </div>
        </Link>
      </div>
    </div>
  </section>
</div>

  )
}

export default cards
