"use client";
import Button from "./components/ui/Button";
import BaseLayout from "./shared/layouts/BaseLayout";
import FeatureCard from "@/app/components/ui/FeatureCard";
import Image from "next/image";
import Generator from "@/app/components/content/Generator";
import TrendingCard from "@/app/components/ui/TrendingCard";
import Footer from "@/app/components/navigation/Footer";
import PricingCard from "@/app/components/ui/PricingCard";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Message from "./chat/components/Message";
import { useDemoChat } from "./chat/hooks/useDemoChat.hook";

export default function Home() {
  const { promptRef, isGenerating, onSubmitDemoChat } = useDemoChat();
  const [generatedMessage, setGeneratedMessage] = useState<{
    text: string;
    sender: "user" | "bot";
    name: string;
    answer_type: "Text" | "Post" | "Meme" | "Video";
  } | null>(null);

  const handleGeneratedMessage = (message: {
    text: string;
    sender: "user" | "bot";
    name: string;
    answer_type: "Text" | "Post" | "Meme" | "Video";
  }) => {
    setGeneratedMessage(message);
  };

  const today = new Date();
  const todayDate = `${
    today.getMonth() + 1
  }/${today.getDate()}/${today.getFullYear()}`;

  const router = useRouter();

  const onGoToLogin = () => {
    router.push("/login");
  };

  const features = [
    {
      title: "AI-Powered Generation",
      description:
        "Create content automatically from any topic using advanced AI",
      icon: "/icons/Robot.svg",
    },
    {
      title: "Trend Analysis",
      description:
        "Stay updated with real-time trends and news across various domains",
      icon: "/icons/TrendUp.svg",
    },
    {
      title: "Multi-Domain Coverage",
      description:
        "Generate content for any industry, niche, or subject matter",
      icon: "/icons/World.svg",
    },
    {
      title: "Multi-format Export",
      description:
        "Generate content in various formats ready to share on any platform",
      icon: "/icons/Share.svg",
    },
  ];

  // Trending data
  const trendingTopics = [
    {
      title: "Artificial Intelligence",
      description:
        "Explore the latest advancements and applications of AI across industries...",
      percentage: 85,
    },
    {
      title: "Sustainable Fashion",
      description:
        "Discover eco-friendly fashion trends and sustainable style tips...",
      percentage: 75,
    },
    {
      title: "Crypto",
      description:
        "Stay updated with the latest developments in cryptocurrency and decentralized web...",
      percentage: 62,
    },
    {
      title: "Bruno Mars & Rose",
      description:
        "Unless you've been living under a rock, or somewhere with seriously dodgy Wi-F...",
      percentage: 61,
    },
  ];

  return (
    <div>
      <BaseLayout>
        {/* Hero */}
        <section className="flex min-h-screen items-center py-20">
          <div className={"max-w-[800px] mx-auto px-4"}>
            <h1 className={"mb-10"}>
              Engage Your Audience with AI-Generated Content
            </h1>
            <p className={"subheading mb-20"}>
              Create compelling content on any topic in seconds. Powered by AI,
              designed for content creators.
            </p>
            <div
              className={
                "flex flex-col space-y-5 md:space-y-0 md:flex-row md:space-x-5 justify-center items-center"
              }
            >
              <Button
                className={"w-44"}
                text={"Try it now"}
                style={"PRIMARY"}
                onClick={() => {
                  window.location.href = "/login";
                }}
              />
              <Button
                className={"w-44"}
                text={"Learn More"}
                style={"TERTIARY"}
                onClick={() => {
                  window.location.href = "#features";
                }}
              />
            </div>
          </div>
        </section>
        {/* Features */}
        <section className="min-h-screen py-20" id="features">
          <h2 className="text-center">Features</h2>
          <p
            className={
              "text-xl text-foreground-secondary text-center mb-16 mt-3 mx-4"
            }
          >
            Everything you need to create engaging content on any topic
          </p>
          <div
            className={
              "grid grid-cols-1 sm:grid-cols-[repeat(2,_minmax(0,_max-content))] xl:grid-cols-[repeat(auto-fit,_minmax(0,_max-content))] justify-items-center justify-center gap-5"
            }
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={
                  <Image
                    src={feature.icon}
                    alt={`${feature.title} logo`}
                    width={67}
                    height={67}
                  />
                }
              />
            ))}
          </div>
        </section>
        {/* Content Generator */}
        <section className="min-h-screen py-20" id="demo">
          <h2 className="text-center">Demo Content Generator</h2>
          <p
            className={
              "text-xl text-foreground-secondary text-center mb-16 mt-3 mx-4"
            }
          >
            Try our AI-powered content generator now
          </p>
          <Generator
            onSubmit={onSubmitDemoChat}
            promptRef={promptRef}
            isGenerating={isGenerating}
            onGeneratedMessage={handleGeneratedMessage}
          />

          {generatedMessage && (
            <div className="flex flex-col justify-center gap-8 mt-10">
              <Message message={generatedMessage} />
              <Button
                text={"Sign Up to continue the conversation"}
                style={"PRIMARY"}
                onClick={onGoToLogin}
                className="w-1/3 mx-auto"
              />
            </div>
          )}
        </section>
        {/* Trending */}
        <section className="min-h-screen py-20" id="trends">
          <h2 className="text-center">Trending</h2>
          <p
            className={
              "text-xl text-foreground-secondary text-center mb-16 mt-3 mx-4"
            }
          >
            Popular topics across various domains
          </p>
          <p className={"text-primary font-bold text-center text-xl mb-8"}>
            Last scan: {todayDate}
          </p>
          <div
            className={
              "grid grid-cols-1 lg:grid-cols-[repeat(2,_minmax(0,_max-content))] justify-items-center justify-center gap-5"
            }
          >
            {trendingTopics.map((topic, index) => (
              <TrendingCard
                key={index}
                title={topic.title}
                description={topic.description}
                percentage={topic.percentage}
              />
            ))}
          </div>
        </section>
        {/* Pricing */}
        <section className={"min-h-[80vh] py-20"} id="pricing">
          <h2>Pricing Plans</h2>
          <div
            className={
              "grid grid-cols-1 xl:grid-cols-[repeat(3,_minmax(0,_max-content))] gap-5 justify-items-center justify-center mt-16 px-4 md:px-0"
            }
          >
            <PricingCard
              title={"Free Plan"}
              type={"$0"}
              description={
                <p
                  className={"flex flex-col text-xl text-foreground-secondary"}
                >
                  <span>Text-only Generation</span>
                  <span>Basic trends access</span>
                  <span>5 generations/daily</span>
                  <span>Community support</span>
                </p>
              }
              buttonText={"Get Started"}
              buttonAction={() => router.push("/login")}
            />
            <PricingCard
              title={"Pro Plan"}
              type={"$49/m"}
              description={
                <p
                  className={"flex flex-col text-xl text-foreground-secondary"}
                >
                  <span>Everything in Free</span>
                  <span>Image generation</span>
                  <span>Video generation</span>
                  <span>10X of Free Plan generations</span>
                  <span>Priority Support</span>
                </p>
              }
              buttonText={"Upgrade Now"}
              buttonAction={() => onGoToLogin()}
            />
            <PricingCard
              title={"Enterprise"}
              type={"$299/m"}
              description={
                <p
                  className={"flex flex-col text-xl text-foreground-secondary"}
                >
                  <span>Custom integrations</span>
                  <span>Dedicated support</span>
                  <span>Team collaboration</span>
                  <span>API access</span>
                  <span>White labelling</span>
                </p>
              }
              buttonText={"Upgrade Now"}
              buttonAction={() => onGoToLogin()}
            />
          </div>
        </section>
        <Footer />
      </BaseLayout>
    </div>
  );
}
