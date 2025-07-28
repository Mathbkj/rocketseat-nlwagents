import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useCreateQuestion } from "@/hooks/useCreateQuestion";
import { Skeleton } from "@/components/ui/skeleton";

// Esquema de validação no mesmo arquivo conforme solicitado
const createQuestionSchema = z.object({
  question: z
    .string()
    .min(1, "Pergunta é obrigatória")
    .min(10, "Pergunta deve ter pelo menos 10 caracteres")
    .max(500, "Pergunta deve ter menos de 500 caracteres"),
});

type CreateQuestionFormData = z.infer<typeof createQuestionSchema>;

interface QuestionFormProps {
  roomId: string;
}

export function QuestionFormSkeleton() {
  return (
    <Card>
      <CardHeader className="space-y-2">
        <Skeleton className="h-6 w-[200px]" />
        <Skeleton className="h-4 w-[300px]" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-2 w-[100px]" />
          <Skeleton className="h-[100px] w-full" />
        </div>
        <div>
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function QuestionForm({ roomId }: QuestionFormProps) {
  const { mutateAsync: createQuestion } = useCreateQuestion(roomId);
  const { formState, ...props } = useForm<CreateQuestionFormData>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      question: "",
    },
  });

  async function handleCreateQuestion(data: CreateQuestionFormData) {
    const response = await createQuestion(data);
    console.log(response);
  }
  const { isSubmitting } = formState;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fazer uma Pergunta</CardTitle>
        <CardDescription>
          Digite sua pergunta abaixo para receber uma resposta gerada por I.A.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form formState={formState} {...props}>
          <form
            className="flex flex-col gap-4"
            onSubmit={props.handleSubmit(handleCreateQuestion)}
          >
            <FormField
              control={props.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sua Pergunta</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      className="min-h-[100px]"
                      placeholder="O que você gostaria de saber?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? "Enviando..." : "Enviar pergunta"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
