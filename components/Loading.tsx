export default function LoadingPage() {
  return (
    <>
      <div className="w-full min-h-screen">
        <section className="text-black flex items-start md:items-center justify-center min-h-screen px-0 py-4">
          <div className="flex items-center justify-center flex-col bg-cover bg-center min-h-screen">
            <div className="flex items-start content-start justify-start h-full overflow-hidden mt-4 w-full max-w-lg min-w-lg">
              <div className="w-full">
                <div className="justify-center p-8">
                  <div className="justify-center flex mt-4">
                    <span className="loading loading-ring loading-lg"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
