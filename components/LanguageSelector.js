import { useState } from "react";
import { useCookies } from "react-cookie";

const LanguageSelector = () => {
  const [cookies, setCookie] = useCookies(["lang"]);
  const [selectedLang, setSelectedLang] = useState(cookies.lang || "en");

  const handleLangChange = (e) => {
    const lang = e.target.value;
    setCookie("lang", lang, { path: "/" });
    setSelectedLang(lang);
    location.reload(); // reload the page to reflect the language change
  };

  return (
    <div   className="bg-gradient-to-b from-violet-300 to-violet-500 w-full py-14"
    id="languageSelector">
      <label htmlFor="lang-select">Welcome</label>

<select  id="lang-select"

        class="box-border flex flex-col items-start relative">
  <option selected>Choose your language</option>
  <option value="en">English</option>
  <option value="fr">Français</option>
  <option value="ar">العربية</option>
</select>


    </div>
    
  );
};

export default LanguageSelector;
