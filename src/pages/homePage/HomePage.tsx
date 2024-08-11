import FoodSection from "../../components/homePage/foodSection/FoodSection.tsx";
import PresentationSection from "../../components/homePage/presentationSection/PresentationSection.tsx";
import WelcomeSection from "../../components/homePage/welcomeSection/WelcomeSection.tsx";
import "./homePage.scss";

export default function HomePage() {
  return (
    <div className="home-page">
      <WelcomeSection/>
      <FoodSection/>
      <PresentationSection/>
    </div>
  )
}
