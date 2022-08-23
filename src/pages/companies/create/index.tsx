import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "../../../components/Button";
import { FormInput } from "../../../components/FormInput";
import { FormInputMask } from "../../../components/FormInputMask";
import { Layout } from "../../../components/Layout";
import { createCompany, findCompany } from "../../../services/company";
import { handleError } from "../../../utils/error";
import { getAllNumbers } from "../../../utils/helpers";
import { handleSuccess } from "../../../utils/success";
import { createCompanyValidator } from "../../../validators/companyValidator";

export default function CreateCompany() {
  const { push, back } = useRouter();
  const [loading, setLoading] = useState(false);
  const { values, errors, handleChange, handleSubmit, setValues } = useFormik({
    initialValues: {
      code: "",
      name: "",
      email: "",
      phone: "",
      cnpj: "",
      address: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await createCompany({
          ...values,
          cnpj: getAllNumbers(values.cnpj),
          phone: getAllNumbers(values.phone),
        });
        handleSuccess("Empresa criada com sucesso!");
        push("/companies");
      } catch (error) {
        handleError(error, "Não foi possivel criar a empresa");
      } finally {
        setLoading(false);
      }
    },
    validationSchema: createCompanyValidator,
  });

  const handleFindCompany = async (cnpj: string) => {
    try {
      const company = await findCompany(cnpj);

      if (company) {
        setValues({
          ...values,
          name: company.nome,
          email: company.email,
          phone: company.telefone,
          address: `${company.logradouro}, ${company.numero} - ${company.bairro}`,
        });
      }
    } catch (error) {
      handleError(error, "Não foi possivel encontrar a empresa");
    }
  };

  return (
    <Layout title="Cadastrar Empresa">
      <div>
        <h1 className="text-3xl flex items-center">
          <FaArrowLeft
            className="mr-2 cursor-pointer hover:text-bluesx"
            onClick={() => back()}
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
              type="text"
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
              onBlur={(e) => handleFindCompany(e.target.value)}
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
            <Button disabled={loading} type="submit">
              Salvar
            </Button>
          </div>
        </div>
      </form>
    </Layout>
  );
}
