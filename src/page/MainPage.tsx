import { Layout } from "~/components/layout";
import { CoordinatesForm } from "~/features/coordinates-form";
import { CoordinatesTable } from "~/features/coordinates-table";

export const MainPage = () => {
  return (
    <Layout>
      <div className="mx-auto my-10">
        <h1 className="text-center">Robots on Mars</h1>

        <div className="flex justify-between my-20">
          <CoordinatesForm />
        </div>

        <div className="mt-20">
          <CoordinatesTable />
        </div>
      </div>
    </Layout>
  );
};
