import { Button, Form, Input, InputNumber, Select } from "antd";
import { MON_TIERS, MON_TYPES } from "../../../../constants/rules";
import { Mon as MonType } from "../../../../types";

export interface MonFormValues
  extends Omit<
    MonType,
    "createdAt" | "updatedAt" | "__monImages__" | "__nextMons__" | "total"
  > {}

export interface MonProps {
  onSubmit: (values: MonFormValues) => void;
  onNavigateToList: VoidFunction;
  isSubmitting: boolean;
  isLoading: boolean;
  defaultFormValues: MonFormValues;
  mons?: MonType[];
}

const Mon: React.FC<MonProps> = ({
  onSubmit,
  onNavigateToList,
  isSubmitting,
  isLoading,
  defaultFormValues,
  mons,
}) => {
  const [form] = Form.useForm();

  return isLoading ? null : (
    <Form
      form={form}
      onFinish={onSubmit}
      initialValues={defaultFormValues}
      scrollToFirstError
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        name="id"
        label="ID"
        rules={[
          {
            required: true,
            message: "ID is required.",
          },
        ]}
      >
        <Input style={{ width: 200 }} disabled={!!defaultFormValues} />
      </Form.Item>
      <Form.Item
        name="order"
        label="Order"
        rules={[
          {
            required: true,
            message: "Order is required.",
          },
        ]}
      >
        <Input style={{ width: 200 }} disabled={!!defaultFormValues} />
      </Form.Item>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: "Name is required.",
          },
        ]}
      >
        <Input style={{ width: 200 }} />
      </Form.Item>
      <Form.Item name="nameKo" label="Name Ko">
        <Input style={{ width: 200 }} />
      </Form.Item>
      <Form.Item name="nameJa" label="Name Ja">
        <Input style={{ width: 200 }} />
      </Form.Item>
      <Form.Item name="nameZh" label="Name Zh">
        <Input style={{ width: 200 }} />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[
          {
            required: true,
            message: "Description is required.",
          },
        ]}
      >
        <Input.TextArea style={{ width: 500 }} />
      </Form.Item>
      <Form.Item name="descriptionKo" label="Description Ko">
        <Input.TextArea style={{ width: 500 }} />
      </Form.Item>
      <Form.Item name="descriptionJa" label="Description Ja">
        <Input.TextArea style={{ width: 500 }} />
      </Form.Item>
      <Form.Item name="descriptionZh" label="Description Zh">
        <Input.TextArea style={{ width: 500 }} />
      </Form.Item>
      <Form.Item
        name="firstType"
        label="First type"
        rules={[
          {
            required: true,
            message: "First type is required.",
          },
        ]}
      >
        <Select style={{ width: 200 }}>
          {MON_TYPES.map((monType) => (
            <Select.Option style={{ width: 200 }} key={monType} value={monType}>
              {monType}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="secondType" label="Second type">
        <Select style={{ width: 200 }}>
          {MON_TYPES.map((monType) => (
            <Select.Option style={{ width: 200 }} key={monType} value={monType}>
              {monType}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="height"
        label="Height"
        rules={[
          {
            required: true,
            message: "Height is required.",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="weight"
        label="Weight"
        rules={[
          {
            required: true,
            message: "Weight is required.",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="tier"
        label="Tier"
        rules={[
          {
            required: true,
            message: "Tier is required.",
          },
        ]}
      >
        <Select style={{ width: 200 }}>
          {MON_TIERS.map((monTier) => (
            <Select.Option key={monTier} value={monTier}>
              {monTier}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="evolutionLevel" label="Evolution level">
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="hp"
        label="HP"
        rules={[
          {
            required: true,
            message: "HP is required.",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="attack"
        label="Attack"
        rules={[
          {
            required: true,
            message: "Attack is required.",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="defense"
        label="Defense"
        rules={[
          {
            required: true,
            message: "Defense is required.",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="specialAttack"
        label="Special attack"
        rules={[
          {
            required: true,
            message: "Special attack is required.",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="specialDefense"
        label="Special defense"
        rules={[
          {
            required: true,
            message: "Special defense is required.",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="speed"
        label="Speed"
        rules={[
          {
            required: true,
            message: "Speed is required.",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="stars"
        label="Stars"
        rules={[
          {
            required: true,
            message: "Stars is required.",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="colPoint"
        label="Collection point"
        rules={[
          {
            required: true,
            message: "Collection point is required.",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item name="evolveFromId" label="Evolution from">
        <Select
          style={{ width: 200 }}
          showSearch
          filterOption={(input, option) => {
            const foundMons = mons!.filter(
              (mon) => (mon.nameKo || mon.name).indexOf(input) >= 0,
            );
            return foundMons.map((mon) => mon.id).includes(option?.value);
          }}
        >
          {mons!.map((mon) => (
            <Select.Option key={mon.id} value={mon.id}>
              {mon.id} - {mon.nameKo || mon.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button htmlType="button" onClick={onNavigateToList} className="mr-2">
          List
        </Button>
        <Button type="primary" htmlType="submit" loading={isSubmitting}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Mon;
