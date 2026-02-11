import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Spinner } from "~/components/ui/spinner";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { useAddContact } from "~/api/mutations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  type ContactFormData,
} from "@project-template/shared";

export default function ContactUs() {
  const addContactMutation = useAddContact();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onTouched",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      notes: null,
    },
  });

  const onSubmit = (values: ContactFormData) => {
    addContactMutation.mutate(values, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-medium text-center mt-4 mb-2">
        Contact us, we would love to hear from you!
      </h1>
      <div className="max-w-5xl w-full mx-auto mt-8">
        <div className="p-4 border rounded ">
          {addContactMutation.isSuccess ? (
            <div className="space-y-4" role="status" aria-live="polite">
              <h2 className="text-2xl font-semibold text-center">
                Thanks for reaching out!
              </h2>
              <p className="text-center">
                We've received your message and will get back to you soon.
              </p>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="p-1">First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="First name"
                          disabled={addContactMutation.isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="p-1">Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Last name"
                          disabled={addContactMutation.isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="p-1">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email address"
                          disabled={addContactMutation.isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="p-1">Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Phone number"
                          inputMode="tel"
                          disabled={addContactMutation.isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="p-1">Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What do you want to speak to us about"
                          className="w-full border rounded px-3 py-2"
                          rows={3}
                          disabled={addContactMutation.isPending}
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {addContactMutation.error ? (
                  <p className="text-destructive text-sm">
                    {addContactMutation.error.message ||
                      "Failed to submit. Please try again."}
                  </p>
                ) : null}

                <Button
                  type="submit"
                  disabled={addContactMutation.isPending}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {addContactMutation.isPending ? (
                    <>
                      <Spinner className="size-4" /> Sending
                    </>
                  ) : (
                    "Send"
                  )}
                </Button>
              </form>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}
