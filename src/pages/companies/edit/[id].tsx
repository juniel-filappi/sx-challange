import { GetServerSidePropsContext } from "next";
import { showCompany, updateCompany } from "../../../services/company";
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
import TableColaborator from "../../../components/TableColaborator";
import Link from "next/link";

interface EditCompanyProps {
  company: ICompany;
}

export default function EditCompany({ company }: EditCompanyProps) {
  const { push, back } = useRouter();

  const [loading, setLoading] = useState(false);
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      id: company.id,
      code: company.code,
      name: company.name,
      email: company.email,
      phone: company.phone,
      cnpj: company.cnpj,
      address: company.address,
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await updateCompany({
          ...values,
          cnpj: getAllNumbers(values.cnpj),
          phone: getAllNumbers(values.phone),
        });
        handleSuccess("Empresa atualizada com sucesso!");
        push("/companies");
      } catch (error) {
        handleError(error, "Não foi possivel criar a empresa");
      } finally {
        setLoading(false);
      }
    },
    validationSchema: updateCompanyValidator,
  });

  return (
    <Layout title={`Editar ${company.name}`}>
      <div>
        <h1 className="text-3xl flex items-center">
          <FaArrowLeft
            className="mr-2 cursor-pointer hover:text-bluesx"
            onClick={() => back()}
          />
          Editar / {company.name}
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
              Editar
            </Button>
          </div>
        </div>
      </form>
      {company.colaborators.length > 0 ? (
        <div className="mt-20">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl mb-2">Colaboradores</h2>
            <Link href="/colaborators/create">
              <button className="border-none px-4 py-2 rounded-xl cursor-pointer mx-1 mb-1 text-black bg-bluesx hover:brightness-75 transition-all duration-200">
                Cadastrar Colaborador
              </button>
            </Link>
          </div>
          <TableColaborator data={company.colaborators} rowsPerPage={4} />
        </div>
      ) : (
        <div></div>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;

  const company = await showCompany(Number(id));

  return {
    props: {
      company,
    },
  };
}
