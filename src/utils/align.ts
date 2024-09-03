import { PlaygroundUIComponent } from "@/types/component.ts";
import createBoundingBox from "@/utils/createBoundingBox.ts";

export function alignCenterHorizontal(components: PlaygroundUIComponent[]) {
  const boundingBox = createBoundingBox(components);
  const bboxCenterY = boundingBox.top + boundingBox.height / 2;

  const groupedComponents = components.reduce<
    Record<string, PlaygroundUIComponent[]>
  >((acc, c) => {
    if (!c.groupId) return acc;
    if (!acc[c.groupId]) {
      acc[c.groupId] = [];
    }
    acc[c.groupId].push(c);
    return acc;
  }, {});

  const groupedDeltaY: Record<string, number> = {};

  Object.entries(groupedComponents).forEach(([groupId, components]) => {
    const groupedBoundingBox = createBoundingBox(components);
    const groupedCenterY =
      groupedBoundingBox.top + groupedBoundingBox.height / 2;
    groupedDeltaY[groupId] = bboxCenterY - groupedCenterY;
  });

  return components.map((c) => {
    const el = document.getElementById(c.id);
    if (!el) return c;

    if (!c.groupId) {
      const componentElement = el.getBoundingClientRect();
      const componentHeight = componentElement.height;
      const componentCenterY = componentElement.top + componentHeight / 2;

      const deltaY = bboxCenterY - componentCenterY;

      return {
        ...c,
        coordinates: {
          ...c.coordinates,
          y: c.coordinates.y + deltaY,
        },
      };
    }

    return {
      ...c,
      coordinates: {
        ...c.coordinates,
        y: c.coordinates.y + groupedDeltaY[c.groupId],
      },
    };
  });
}

export function alignCenterVertical(components: PlaygroundUIComponent[]) {
  const boundingBox = createBoundingBox(components);
  const bboxCenterX = boundingBox.left + boundingBox.width / 2;

  const groupedComponents = components.reduce<
    Record<string, PlaygroundUIComponent[]>
  >((acc, c) => {
    if (!c.groupId) return acc;
    if (!acc[c.groupId]) {
      acc[c.groupId] = [];
    }
    acc[c.groupId].push(c);
    return acc;
  }, {});

  const groupedDeltaX: Record<string, number> = {};

  Object.entries(groupedComponents).forEach(([groupId, components]) => {
    const groupedBoundingBox = createBoundingBox(components);
    const groupedCenterX =
      groupedBoundingBox.left + groupedBoundingBox.width / 2;
    groupedDeltaX[groupId] = bboxCenterX - groupedCenterX;
  });

  return components.map((c) => {
    const el = document.getElementById(c.id);
    if (!el) return c;

    if (!c.groupId) {
      const componentElement = el.getBoundingClientRect();
      const componentWidth = componentElement.width;
      const componentCenterX = componentElement.left + componentWidth / 2;

      const deltaX = bboxCenterX - componentCenterX;

      return {
        ...c,
        coordinates: {
          ...c.coordinates,
          x: c.coordinates.x + deltaX,
        },
      };
    }

    return {
      ...c,
      coordinates: {
        ...c.coordinates,
        x: c.coordinates.x + groupedDeltaX[c.groupId],
      },
    };
  });
}

export function alignEndHorizontal(components: PlaygroundUIComponent[]) {
  const boundingBox = createBoundingBox(components);
  const bboxBottom = boundingBox.top + boundingBox.height;

  const groupedComponents = components.reduce<
    Record<string, PlaygroundUIComponent[]>
  >((acc, c) => {
    if (!c.groupId) return acc;
    if (!acc[c.groupId]) {
      acc[c.groupId] = [];
    }
    acc[c.groupId].push(c);
    return acc;
  }, {});

  const groupedDeltaY: Record<string, number> = {};

  Object.entries(groupedComponents).forEach(([groupId, components]) => {
    const groupedBoundingBox = createBoundingBox(components);
    const groupedBottom = groupedBoundingBox.top + groupedBoundingBox.height;
    groupedDeltaY[groupId] = bboxBottom - groupedBottom;
  });

  return components.map((c) => {
    const el = document.getElementById(c.id);
    if (!el) return c;

    if (!c.groupId) {
      const componentElement = el.getBoundingClientRect();
      const componentHeight = componentElement.height;
      const componentBottom = componentElement.top + componentHeight;

      const deltaY = bboxBottom - componentBottom;

      return {
        ...c,
        coordinates: {
          ...c.coordinates,
          y: c.coordinates.y + deltaY,
        },
      };
    }

    return {
      ...c,
      coordinates: {
        ...c.coordinates,
        y: c.coordinates.y + groupedDeltaY[c.groupId],
      },
    };
  });
}

export function alignEndVertical(components: PlaygroundUIComponent[]) {
  const boundingBox = createBoundingBox(components);
  const bboxRight = boundingBox.left + boundingBox.width;

  const groupedComponents = components.reduce<
    Record<string, PlaygroundUIComponent[]>
  >((acc, c) => {
    if (!c.groupId) return acc;
    if (!acc[c.groupId]) {
      acc[c.groupId] = [];
    }
    acc[c.groupId].push(c);
    return acc;
  }, {});

  const groupedDeltaX: Record<string, number> = {};

  Object.entries(groupedComponents).forEach(([groupId, components]) => {
    const groupedBoundingBox = createBoundingBox(components);
    const groupedRight = groupedBoundingBox.left + groupedBoundingBox.width;
    groupedDeltaX[groupId] = bboxRight - groupedRight;
  });

  return components.map((c) => {
    const el = document.getElementById(c.id);
    if (!el) return c;

    if (!c.groupId) {
      const componentElement = el.getBoundingClientRect();
      const componentWidth = componentElement.width;
      const componentRight = componentElement.left + componentWidth;

      const deltaX = bboxRight - componentRight;

      return {
        ...c,
        coordinates: {
          ...c.coordinates,
          x: c.coordinates.x + deltaX,
        },
      };
    }

    return {
      ...c,
      coordinates: {
        ...c.coordinates,
        x: c.coordinates.x + groupedDeltaX[c.groupId],
      },
    };
  });
}

export function alignStartHorizontal(components: PlaygroundUIComponent[]) {
  const boundingBox = createBoundingBox(components);
  const bboxTop = boundingBox.top;

  const groupedComponents = components.reduce<
    Record<string, PlaygroundUIComponent[]>
  >((acc, c) => {
    if (!c.groupId) return acc;
    if (!acc[c.groupId]) {
      acc[c.groupId] = [];
    }
    acc[c.groupId].push(c);
    return acc;
  }, {});

  const groupedDeltaY: Record<string, number> = {};

  Object.entries(groupedComponents).forEach(([groupId, components]) => {
    const groupedBoundingBox = createBoundingBox(components);
    groupedDeltaY[groupId] = bboxTop - groupedBoundingBox.top;
  });

  return components.map((c) => {
    const el = document.getElementById(c.id);
    if (!el) return c;

    if (!c.groupId) {
      const componentElement = el.getBoundingClientRect();
      const deltaY = bboxTop - componentElement.top;

      return {
        ...c,
        coordinates: {
          ...c.coordinates,
          y: c.coordinates.y + deltaY,
        },
      };
    }

    return {
      ...c,
      coordinates: {
        ...c.coordinates,
        y: c.coordinates.y + groupedDeltaY[c.groupId],
      },
    };
  });
}

export function alignStartVertical(components: PlaygroundUIComponent[]) {
  const boundingBox = createBoundingBox(components);
  const bboxLeft = boundingBox.left;

  const groupedComponents = components.reduce<
    Record<string, PlaygroundUIComponent[]>
  >((acc, c) => {
    if (!c.groupId) return acc;
    if (!acc[c.groupId]) {
      acc[c.groupId] = [];
    }
    acc[c.groupId].push(c);
    return acc;
  }, {});

  const groupedDeltaX: Record<string, number> = {};

  Object.entries(groupedComponents).forEach(([groupId, components]) => {
    const groupedBoundingBox = createBoundingBox(components);
    groupedDeltaX[groupId] = bboxLeft - groupedBoundingBox.left;
  });

  return components.map((c) => {
    const el = document.getElementById(c.id);
    if (!el) return c;

    if (!c.groupId) {
      const componentElement = el.getBoundingClientRect();
      const deltaX = bboxLeft - componentElement.left;

      return {
        ...c,
        coordinates: {
          ...c.coordinates,
          x: c.coordinates.x + deltaX,
        },
      };
    }

    return {
      ...c,
      coordinates: {
        ...c.coordinates,
        x: c.coordinates.x + groupedDeltaX[c.groupId],
      },
    };
  });
}
