import Image from "next/image";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import emailjs from "@emailjs/browser";

const Contact = () => {
	const [showButton, setShowButton] = useState(false);
	const form = useRef();

	const sendEmail = (e: any) => {
		e.preventDefault();

		emailjs
			.sendForm(
				"service_s6mhkte",
				"template_evpoxop",
				form.current,
				"hZxrxCACq8K6qUxwh"
			)
			.then(
				(result) => {
					console.log(result.text);
					console.log("SENT");
				},
				(error) => {
					console.log(error.text);
				}
			);
	};
	return (
		<div className="mt-48 mb-32 flex justify-center text-center px-0">
			<Dialog>
				<DialogTrigger asChild>
					<Image
						src="/assets/contact.jpg"
						width={500}
						height={100}
						alt="contact"
						className="hover:opacity-50 ease-in-out duration-300"
					/>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[600px] bg-[#f6f8f5]">
					<DialogHeader>
						<DialogTitle>Contact</DialogTitle>
						<DialogDescription>
							Have any questions?
						</DialogDescription>
					</DialogHeader>
					<form ref={form} onSubmit={sendEmail}>
						<div className="grid gap-5 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="name" className="text-center">
									Name
								</Label>
								<Input
									required
									name="user_name"
									placeholder="Buffy"
									className="col-span-3"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label
									htmlFor="username"
									className="text-center"
								>
									Email
								</Label>
								<Input
									required
									name="user_email"
                                    type="email"
									placeholder="strawhat123@gmail.com"
									className="col-span-3"
								/>
							</div>
							<div className="grid grid-cols-4 items-start gap-4">
								<Label
									htmlFor="username"
									className="text-center"
								>
									Message
								</Label>
								<Textarea
									placeholder="Type your message here."
									className="col-span-3"
                                    name="message"
								/>
							</div>
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<Button type="submit" className="bg-[#7E9C6C]">
									Send
								</Button>
							</DialogClose>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Contact;
