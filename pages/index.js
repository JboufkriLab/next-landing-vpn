import Feature from "../components/Feature";
import Pricing from "../components/Pricing";
import Hero from "../components/Hero";
import Layout from "../components/Layout/Layout";
import SeoHead from "../components/SeoHead";


import LanguageSelector from "../components/LanguageSelector";



export default function Home() {
  return (
    <>
      <SeoHead title='Lista market Landing Page' />
      <Layout>
      <LanguageSelector />
        <Hero />
        <Feature />
        <Pricing />
        
      </Layout>
    </>
  );
}
