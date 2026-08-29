import type {
  ArrayInputFunctionsProps,
  ArrayOfObjectsInputProps,
  ArraySchemaType,
  SchemaType,
} from "sanity";

type DetailBlockItem = {
  _key: string;
  _type: string;
};

const buttonStyle = {
  alignItems: "center",
  background: "#25283a",
  border: "1px solid #3d4261",
  borderRadius: "3px",
  color: "white",
  cursor: "pointer",
  display: "inline-flex",
  font: "inherit",
  fontWeight: 600,
  gap: "0.45rem",
  minHeight: "2.25rem",
  padding: "0.45rem 0.8rem",
} satisfies React.CSSProperties;

const disabledButtonStyle = {
  ...buttonStyle,
  cursor: "not-allowed",
  opacity: 0.55,
} satisfies React.CSSProperties;

function PlusIcon() {
  return (
    <span aria-hidden="true" style={{ fontSize: "1.15rem", lineHeight: 1 }}>
      +
    </span>
  );
}

type DetailBlocksArrayFunctionsProps = Omit<
  ArrayInputFunctionsProps<DetailBlockItem, ArraySchemaType>,
  "onValueCreate" | "schemaType"
> & {
  onValueCreate: (type: SchemaType) => DetailBlockItem;
  schemaType: ArraySchemaType;
};

export function DetailBlocksArrayFunctions({
  onItemAppend,
  onValueCreate,
  readOnly,
  schemaType,
}: DetailBlocksArrayFunctionsProps) {
  const addItem = (typeName: "projectTextBlock" | "projectImage") => {
    const itemType = schemaType.of.find(
      (type: SchemaType) => type.name === typeName,
    );

    if (!itemType) {
      return;
    }

    onItemAppend(onValueCreate(itemType));
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      <button
        disabled={readOnly}
        onClick={() => addItem("projectTextBlock")}
        style={readOnly ? disabledButtonStyle : buttonStyle}
        type="button"
      >
        <PlusIcon />
        Tekst toevoegen
      </button>
      <button
        disabled={readOnly}
        onClick={() => addItem("projectImage")}
        style={readOnly ? disabledButtonStyle : buttonStyle}
        type="button"
      >
        <PlusIcon />
        Afbeelding toevoegen
      </button>
    </div>
  );
}

export function DetailBlocksInput(props: ArrayOfObjectsInputProps) {
  const inputProps = {
    ...props,
    arrayFunctions: DetailBlocksArrayFunctions,
  } as unknown as Parameters<typeof props.renderDefault>[0];

  return props.renderDefault(inputProps);
}
