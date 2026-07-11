export type Dean = {
  role: string;
  name?: string;
  email?: string;
  phone?: string;
  focus?: string;
  placeholder?: boolean;
};

export const deans: Dean[] = [
  {
    role: "Dean Academic",
    email: "", // deanac@becbgk.edu — TODO: restore official email
    placeholder: true,
    focus: "Programs & curriculum",
  },
  {
    role: "Dean Placement & Training",
    email: "", // placement@becbgk.edu — TODO: restore official email
    placeholder: true,
    focus: "Career services & placements",
  },
  {
    role: "Dean Research & Development",
    email: "", // deanrd@becbgk.edu — TODO: restore official email
    placeholder: true,
    focus: "Research, innovation, consultancy",
  },
  {
    role: "Dean Quality Assurance",
    placeholder: true,
    focus: "Accreditation & quality systems",
  },
];
