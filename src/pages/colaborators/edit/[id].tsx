import { GetServerSidePropsContext } from "next";
import { getCompanies, showCompany, updateCompany } from "../../../services/company";
import { ICompany } from "../../../interfaces/ICompany";
import { useRouter } from "next/router";
import { useState } from "react";
import { useFormik } from "formik";
import { handleSuccess } from "../../../utils/success";
import { handleError } from "../../../utils/error";
import { updateCompanyValidator } from "../../../validators/companyValidator";
import { Layout } from "../../../components/Layout";
import { FaArrowLeft } from "react-icons/fa";
import { FormInput } from "../../../components/FormInput";
import { FormInputMask } from "../../../components/FormInputMask";
import { Button } from "../../../components/Button";
import { getAllNumbers } from "../../../utils/helpers";
import { showColaborator, updateColaborator } from "../../../services/colaborator";
import { IColaborator } from "../../../interfaces/IColaborators";
import { updateColaboratorValidator } from "../../../validators/colaboratorValidator";
import ReactSelect, { StylesConfig } from "react-select";

interface EditColaboratorProps {
  colaborator: IColaborator;
  companies: ICompany[];
}

export default function EditColaborators({ colaborator, companies }: EditColaboratorProps) {
  const { push, back } = useRouter();

  const [loading, setLoading] = useState(false);
  const { values, errors, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      id: colaborator.id,
      code: colaborator.code,
      name: colaborator.name,
      email: colaborator.email,
      phone: colaborator.phone,
      cpf: colaborator.cpf,
      address: colaborator.address,
      companyId: colaborator.companyId,
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await updateColaborator({
          ...values,
          cpf: getAllNumbers(values.cpf),
          phone: getAllNumbers(values.phone),
          companyId: values.companyId,
        });
        handleSuccess("Colaborador atualizado com sucesso!");
        push("/colaborators");
      } catch (error) {
        handleError(error, "Não foi possivel atualizar o colaborador");
      } finally {
        setLoading(false);
      }
    },
    validationSchema: updateColaboratorValidator,
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
    <Layout title={`Editar ${colaborator.name}`}>
      <div>
        <h1 className="text-3xl flex items-center">
          <FaArrowLeft
            className="mr-2 cursor-pointer hover:text-bluesx"
            onClick={() => back()}
          />
          Editar / {colaborator.name}
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
          <div className="grid grid-cols-1 gap-2 items-center mt-2">
            <div className="flex flex-col">
              <label className="mb-1">Empresa</label>
              <ReactSelect
                name="companyId"
                id="companyId"
                options={companies}
                styles={colorStyles}
                isMulti={false}
                defaultValue={companies.find((company) => company.id === values.companyId)}
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
              Editar
            </Button>
          </div>
        </div>
      </form>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;

  const colaborator = await showColaborator(Number(id));
  const companies = await getCompanies();

  return {
    props: {
      colaborator,
      companies
    },
  };
}
