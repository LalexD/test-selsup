import React from "react";

type TColor = string;

type TParam = "string";

interface Param {
  id: number;
  name: string;
  type: TParam;
}
interface ParamValue {
  paramId: number;
  value: string;
}
interface Model {
  paramValues: ParamValue[];
  colors: TColor[];
}
interface Props {
  params: Param[];
  model: Model;
}

export const DEF_PARAMS: Props["params"] = [
  {
    id: 1,
    name: "Назначение",
    type: "string",
  },
  {
    id: 2,
    name: "Длина",
    type: "string",
  },
];
export const DEF_MODEL: Props["model"] = {
  colors: [],
  paramValues: [
    {
      paramId: 1,
      value: "повседневное",
    },
    {
      paramId: 2,
      value: "макси",
    },
  ],
};

interface State {
  curParams: Record<number, string>;
}

interface IFormInputProps {
  name: string;
  label: string;
  type: TParam;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function FormInput({ name, label, type, value, onChange }: IFormInputProps) {
  const getInputByType = (type: TParam) => {
    switch (type) {
      case "string":
        return (
          <input name={name} onChange={onChange} type="text" value={value} />
        );
    }
  };
  return (
    <div className="container_form-list_item">
      <label>{label}:</label>
      {getInputByType(type)}
    </div>
  );
}

export class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const initModelValues = props.model.paramValues.reduce((res, param) => {
      res[param.paramId] = param.value;
      return res;
    }, {} as Record<number, string>);
    this.state = {
      curParams: initModelValues,
    };
  }

  public getModel(): Model {
    const newParamValues: ParamValue[] = Object.entries(
      this.state.curParams
    ).map(([key, value]) => ({ paramId: Number(key), value }));
    const model: Model = { ...this.props.model, paramValues: newParamValues };
    return model;
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = {
      ...this.state.curParams,
      [event.target.name]: event.target.value,
    };
    this.setState({ curParams: newParams });
  };

  private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(JSON.stringify(this.state.curParams));
  };

  render(): React.ReactNode {
    return (
      <form onSubmit={this.handleSubmit} className="container_form">
        <div className="container_form-list">
          {this.props.params.map((param) => (
            <FormInput
              name={String(param.id)}
              label={param.name}
              type={param.type}
              value={this.state.curParams[param.id]}
              onChange={this.handleChange}
            />
          ))}
        </div>
        <button type="submit">Отправка формы</button>
      </form>
    );
  }
}
