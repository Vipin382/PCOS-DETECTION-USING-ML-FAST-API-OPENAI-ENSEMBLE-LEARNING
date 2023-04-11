import { TextInput, Paper, Title, Container, Button } from "@mantine/core";
import { GetPredictions, getData, getDatatFromOpenAi } from "./api/connection";
import { useForm } from "@mantine/form";
import { Select } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { dietState } from "./atom";

export interface FormDataI {
  age: number;
  weight: number;
  height: number;
  cycle: number;
  food: number;
}

const Form = () => {
  const form = useForm<FormDataI>({
    initialValues: {
      age: 0,
      weight: 0,
      height: 0,
      cycle: 0,
      food: 0,
    },
  });
  const navigate = useNavigate();
  const [state, setState] = useRecoilState(dietState);

  const handleSubmission = async (values: FormDataI) => {
    const response = await GetPredictions(values);
    const data = await getDatatFromOpenAi({
      age: values.age,
      weight: values.weight,
      height: values.height,
      cycle: values.cycle,
      food: values.food,
      havePcos: response.result,
      vegetarian: true,
    });
    setState({
      havePcos: response.result,
      dietPlan: data as string,
    });
    window.localStorage.setItem("havePcos", response.result);
    window.localStorage.setItem("diet", data as string);
    navigate("/user");
  };
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit((values) => handleSubmission(values))}>
          <TextInput
            label="Age"
            type={"number"}
            placeholder="Age"
            required
            {...form.getInputProps("age")}
          />
          <TextInput
            label="Weight"
            type={"number"}
            placeholder="Weight"
            required
            {...form.getInputProps("weight")}
          />
          <TextInput
            label="Height"
            placeholder="Height"
            type={"number"}
            required
            {...form.getInputProps("height")}
          />
          <TextInput
            label="Cycle Length"
            placeholder="Cycle Length"
            type={"number"}
            required
            {...form.getInputProps("cycle")}
          />

          <Select
            label="Fast Food(Y/N)"
            placeholder="Fast Food (Y/N)"
            data={[
              { value: "1", label: "Yes" },
              { value: "0", label: "No" },
            ]}
            {...form.getInputProps("food")}
          />
          <Button fullWidth mt="xl" type={"submit"} className="bg-red-500">
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Form;
