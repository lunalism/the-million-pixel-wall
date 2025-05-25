"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AboutContent() {
    return (
        <section className="max-w-screen-xl mx-auto px-4 md:px-8 mt-12">
            <h2 className="text-2xl font-bold mb-6">About This Project</h2>

            <Tabs defaultValue="what" className="w-full grid md:grid-cols-4 gap-8 items-start">
                {/* 탭 메뉴 영역 */}
                <TabsList className="flex flex-col items-start space-y-6 col-span-1 bg-transparent mt-20">
                <TabsTrigger
                    value="what"
                    className="justify-start px-4 py-2 rounded-md hover:bg-muted data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                    🧱 What
                </TabsTrigger>
                <TabsTrigger
                    value="why"
                    className="justify-start px-4 py-2 rounded-md hover:bg-muted data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                    🔥 Why 2025
                </TabsTrigger>
                <TabsTrigger
                    value="how"
                    className="justify-start px-4 py-2 rounded-md hover:bg-muted data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                    ⚙️ How it works
                </TabsTrigger>
                <TabsTrigger
                    value="who"
                    className="justify-start px-4 py-2 rounded-md hover:bg-muted data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                    👤 Who made this?
                </TabsTrigger>
                </TabsList>

                {/* 탭 컨텐츠 영역 */}
                <div className="col-span-3">
                <TabsContent value="what">
                    <h3 className="text-lg font-semibold mb-2">What is the Million Pixel Wall?</h3>
                    <p className="text-muted-foreground">
                    The Million Pixel Wall is a digital canvas where users can purchase and own pixels.
                    Originally launched in 2005, this 2025 version brings a modern revival of the nostalgic concept
                    with a cleaner UI, admin tools, and pixel moderation.
                    </p>
                </TabsContent>

                <TabsContent value="why">
                    <h3 className="text-lg font-semibold mb-2">Why the 2025 Version?</h3>
                    <p className="text-muted-foreground">
                    It’s been 20 years since the original launched. We wanted to celebrate this digital landmark by bringing it back—
                    revamped for today’s web standards and creative expression.
                    </p>
                </TabsContent>

                <TabsContent value="how">
                    <h3 className="text-lg font-semibold mb-2">How Does It Work?</h3>
                    <p className="text-muted-foreground">
                    You pick a pixel spot, upload an image and message, pay via PayPal, and you’re set! Admins can manage content,
                    and users can report inappropriate pixels for review.
                    </p>
                </TabsContent>

                <TabsContent value="who">
                    <h3 className="text-lg font-semibold mb-2">Who Made This?</h3>
                    <p className="text-muted-foreground">
                    This 2025 version is a modern remake built with Next.js, Supabase, shadcn/ui, and PayPal.
                    Inspired by the original, made with ❤️ for today’s creators and collectors.
                    </p>
                </TabsContent>
                </div>
            </Tabs>
        </section>
    );
}
