

const Landing = () => {

  const handleSubmit = () => {
    window.location.href = "/home"
  }

  return (
    <div className="relative h-full">
      <div className="flex flex-col lg:flex-row justify-between">
        <section className="absolute h-3/6 lg:bottom-40 top-40 text-center lg:text-left mx-16">
          <h1 className="text-3xl lg:text-7xl font-bold loading-text">
            <p><span className="text-gradient">Enrich</span > <span className="text-white">your</span> <span className="text-gradient">email</span></p>
            <p className="text-white">writing experience</p>
            <p className="text-white">with <span className="text-gradient">AI</span></p>
          </h1>
        </section>
        <section className="absolute right-12 lg:right-20 text-center lg:text-left top-96 lg:top-52 py-12 loading-text h-64 lg:h-2/4 px-5 border-violet-600 border-2 rounded-lg shadow-lg shadow-cyan-500/50">
          <h1 className="text-1xl lg:text-3xl font-semibold">
            <p className="text-white">Supercharge your email writing</p>
            <p className="text-white">skills with a single-click</p>
            <p className="text-white">user-friendly interface</p>
          </h1>
        </section>
      </div>
      <img src ="https://res.cloudinary.com/open-container/image/upload/v1708605472/email-generator/image-1.png" alt="" className="w-full absolute bottom-0 h-3/6 opacity-50" />
      <img src="https://res.cloudinary.com/open-container/image/upload/v1708605471/email-generator/image-2.png" alt="" className="h-20 w-20 absolute bottom-44 lg:bottom-64 right-40 lg:right-48 loading-text" />
      <section className="absolute lg:bottom-48 left-28 lg:left-20 top-64 lg:top-96">
        <button onClick={handleSubmit} className="btn btn-outline btn-success mt-10 "><h1 className="text-2xl">
          Get Started
        </h1></button>
      </section>

    </div>
  );
}

export default Landing