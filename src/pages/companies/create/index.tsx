import { useFormik } from "formik";
import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "../../../components/Button";
import { FormInput } from "../../../components/FormInput";
import { FormInputMask } from "../../../components/FormInputMask";
import { Layout } from "../../../components/Layout";
import { createCompanyValidator } from "../../../validators/companyValidator";

export default function CreateCompany() {
  const { push } = useRouter();
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      code: "",
      name: "",
      email: "",
      phone: "",
      cnpj: "",
      address: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: createCompanyValidator,
  });
  return (
    <Layout title="Cadastrar Empresa">
      <div>
        <h1 className="text-3xl flex items-center">
          <FaArrowLeft
            className="mr-2 cursor-pointer hover:text-bluesx"
            onClick={() => push("/companies")}
          />
          Cadastrar / Empresa
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
            <FormInput
              id="code"
              name="code"
              label="Código"
              type="number"
              value={values.code}
              error={errors?.code}
              onChange={handleChange}
            />
            <FormInputMask
              id="cnpj"
              name="cnpj"
              label="CNPJ"
              mask="99.999.999/9999-99"
              value={values.cnpj}
              error={errors?.cnpj}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center mt-2">
            <FormInput
              id="name"
              name="name"
              label="Nome"
              value={values.name}
              error={errors?.name}
              onChange={handleChange}
            />
            <FormInput
              id="email"
              name="email"
              label="E-mail"
              value={values.email}
              error={errors?.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center mt-2">
            <FormInputMask
              id="phone"
              name="phone"
              label="Telefone"
              mask="(99) 99999-9999"
              value={values.phone}
              error={errors?.phone}
              onChange={handleChange}
            />
            <FormInput
              id="address"
              name="address"
              label="Endereço"
              value={values.address}
              error={errors?.address}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end mt-2">
            <Button type="submit">
              Salvar
            </Button>
          </div>
        </div>
      </form>
    </Layout>
  );
}
