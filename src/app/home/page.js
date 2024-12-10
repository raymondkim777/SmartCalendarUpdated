import Header from "../header";
import CalendarWeek from "../calendarweek";

const Home = () => {
    return (
        <div className='flex flex-col w-full h-screen overflow-hidden bg-stone-50 font-[family-name:var(--font-geist-sans)] font-semibold'>
            <Header />
            {/* Calendar */}
            <main className="flex flex-col w-full h-fit items-center pt-4 overflow-y-auto"> {/* overflow-y-scroll */}
                <CalendarWeek />
            </main>
        </div>
    )
}

export default Home;