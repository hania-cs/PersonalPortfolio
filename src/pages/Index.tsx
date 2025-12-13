import Desktop from "@/components/Desktop";
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Hania Seifeldeen | Web Developer</title>
        <meta name="description" content="Interactive portfolio of Hania Seifeldeen - Web developer and founder passionate about building beautiful applications." />
      </Helmet>
      <Desktop />
    </>
  );
};

export default Index;
