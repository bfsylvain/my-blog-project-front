import FoodSection from "../../components/homePage/foodSection/FoodSection";
import PresentationSection from "../../components/homePage/presentationSection/PresentationSection";
import WelcomeSection from "../../components/homePage/welcomeSection/WelcomeSection";
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
