import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFormSchema, type DataForm } from "@/types/FormData";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useCreateRoom } from "@/hooks/useCreateRoom";

<<<<<<< HEAD
export default function CreateRoomForm() {
=======
export function CreateRoomForm() {
>>>>>>> 5f1a0ac (Initial commit)
  const { mutateAsync: createRoom } = useCreateRoom();
  const roomForm = useForm<DataForm>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function handleCreateRoom({ name, description }: DataForm) {
    await createRoom({ name, description });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar sala</CardTitle>
        <CardDescription>
          Crie uma sala para começar a formular perguntas e respostas através de
          um agent de I.A.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...roomForm}>
          <form
            onSubmit={roomForm.handleSubmit(handleCreateRoom)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={roomForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da sala</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Digite o nome da sala" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={roomForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição </FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Criar sala
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
