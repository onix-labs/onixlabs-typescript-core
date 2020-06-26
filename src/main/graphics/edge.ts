import { Enum } from "../core";

export class Edge extends Enum {
    public static readonly NONE: Edge = new Edge(0, "NONE");
    public static readonly TOP: Edge = new Edge(1, "TOP");
    public static readonly RIGHT: Edge = new Edge(2, "RIGHT");
    public static readonly BOTTOM: Edge = new Edge(3, "BOTTOM");
    public static readonly LEFT: Edge = new Edge(4, "LEFT");
}
