import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import banner from "../assets/banner.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [longURL, setLongURL] = useState();
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();

    if (longURL) navigate(`/auth?createNew=${longURL}`);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="my-5 sm:my-16 text-3xl sm:text-6xl lg:text7xl text-blue-500 text-center font-extrabold">
        Simplify Your Links, <br />
        Amplify Your Impact.
      </h2>
      <form
        onSubmit={handleShorten}
        className="sm:h-14 flex flex-col  sm:flex-row w-full md:w-2/4 gap-2"
      >
        <Input
          className="h-full flex-1 py-4 px-4"
          type="url"
          placeholder="Enter your long URL"
          value={longURL}
          onChange={(e) => setLongURL(e.target.value)}
        />
        <Button className="h-full" type="submit" variant="destructive">
          Shorten!
        </Button>
      </form>
      <img
        src={banner}
        alt="banner"
        className="max-w-screen-2xl mt-[-300px] md:px-11 z-[-1]"
      />

      <Accordion type="multiple" collapsible className="w-1/2 md:px-11">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            How do I shorten a URL using your application?
          </AccordionTrigger>
          <AccordionContent>
            To shorten a URL, simply copy the long URL you want to shorten,
            paste it into the input field on our homepage, and click the
            "Shorten" button. Our application will generate a shorter, more
            manageable link for you to use.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Is there a limit to how many URLs I can shorten?
          </AccordionTrigger>
          <AccordionContent>
            No, there is no limit to the number of URLs you can shorten using
            our application. You can shorten as many URLs as you need,
            completely free of charge.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            Can I track the performance of my shortened links?
          </AccordionTrigger>
          <AccordionContent>
            Yes, our application provides detailed analytics for your shortened
            links. You can track the number of clicks, geographic location of
            the users, and referral sources to understand how your links are
            performing.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Landing;
