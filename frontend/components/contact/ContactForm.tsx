"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsSubmitting(false);
    };

    return (
        <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                    Send us a message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                type="text"
                                id="firstName"
                                name="firstName"
                                required
                                className="mt-1"
                                placeholder="Your first name"
                            />
                        </div>
                        <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                type="text"
                                id="lastName"
                                name="lastName"
                                required
                                className="mt-1"
                                placeholder="Your last name"
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="mt-1"
                            placeholder="your.email@example.com"
                        />
                    </div>

                    <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="mt-1"
                            placeholder="+977-XXX-XXXX-XXX"
                        />
                    </div>

                    <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Select>
                            <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select a topic" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="general">
                                    General Inquiry
                                </SelectItem>
                                <SelectItem value="support">
                                    Technical Support
                                </SelectItem>
                                <SelectItem value="partnership">
                                    Partnership
                                </SelectItem>
                                <SelectItem value="feedback">
                                    Feedback
                                </SelectItem>
                                <SelectItem value="press">
                                    Press/Media
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                            id="message"
                            name="message"
                            rows={6}
                            required
                            className="mt-1"
                            placeholder="Tell us how we can help you..."
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
