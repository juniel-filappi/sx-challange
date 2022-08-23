import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import ReactSelect, { StylesConfig } from "react-select";
import { Button } from "../../../components/Button";
import { FormInput } from "../../../components/FormInput";
import { FormInputMask } from "../../../components/FormInputMask";
import { Layout } from "../../../components/Layout";
import { ICompany } from "../../../interfaces/ICompany";
import { createColaborator } from "../../../services/colaborator";
import { getCompanies } from "../../../services/company";
import { handleError } from "../../../utils/error";
import { getAllNumbers } from "../../../utils/helpers";
import { handleSuccess } from "../../../utils/success";
import { createColaboratorValidator } from "../../../validators/colaboratorValidator";

interface CreateColaboratorProps {
  companies: ICompany[];
}

export default function CreateColaborator({
  companies,
}: CreateColaboratorProps) {
  const { push, back } = useRouter();
  const [loading, setLoading] = useState(false);
  const { values, errors, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        code: "",
        name: "",
        email: "",
        phone: "",
        cpf: "",
        address: "",
        companyId: 0,
      },
      onSubmit: async (values) => {
        setLoading(true);
        try {
          await createColaborator({
            ...values,
            cpf: getAllNumbers(values.cpf),
            phone: getAllNumbers(values.phone),
          });
          handleSuccess("Colaborador criado com sucesso!");
          push("/colaborators");
        } catch (error) {
          handleError(error, "Não foi possivel criar o colaborador");
        } finally {
          setLoading(false);
        }
      },
      validationSchema: createColaboratorValidator,
    });

  const colorStyles: StylesConfig<ICompany> = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "transparent",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = isDisabled
        ? "#000"
        : isSelected
        ? "#00D8FD"
        : isFocused
        ? "#ccc"
        : "#fff";
      return {
        ...styles,
        backgroundColor: color,
        color: "#000",
        cursor: "pointer",
      };
    },
    singleValue: (styles) => ({
      ...styles,
      color: "#fff",
    }),
  };

  return (
    <Layout title="Cadastrar Empresa">
      <div>
        <h1 className="text-3xl flex items-center">
          <FaArrowLeft
            className="mr-2 cursor-pointer hover:text-bluesx"
            onClick={() => back()}
          />
          Cadastrar / Colaborador
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
              id="cpf"
              name="cpf"
              label="CPF"
              mask="999.999.999-99"
              value={values.cpf}
              error={errors?.cpf}
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
          <div className="grid grid-cols-1 gap-2 items-center mt-2">
            <div className="flex flex-col">
              <label className="mb-1">Empresa</label>
              <ReactSelect
                name="companyId"
                id="companyId"
                options={companies}
                styles={colorStyles}
                isMulti={false}
                getOptionLabel={(e) => e.name}
                getOptionValue={(e) => String(e.id)}
                placeholder=""
                className="mx-1"
                onChange={(e) => {
                  setFieldValue("companyId", e?.id);
                }}
              />
            </div>
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

export async function getServerSideProps() {
  const companies = await getCompanies();

  return {
    props: {
      companies,
    },
  };
}
