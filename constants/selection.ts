import type { Selection } from "./types/selection";

class ManageSelection {
  private static instance: ManageSelection;
  private htmlSelection: () => Selection;
  private cssSelection: () => Selection;
  private jsSelection: () => Selection;

  private constructor() {
    // Initialize with default empty functions
    this.htmlSelection = () => ({} as Selection);
    this.cssSelection = () => ({} as Selection);
    this.jsSelection = () => ({} as Selection);
  }

  public static getInstance(): ManageSelection {
    if (!ManageSelection.instance) {
      ManageSelection.instance = new ManageSelection();
    }
    return ManageSelection.instance;
  }

  public setHtmlSelection(callback: () => Selection): void {
    this.htmlSelection = callback;
  }

  public setCssSelection(callback: () => Selection): void {
    this.cssSelection = callback;
  }

  public setJsSelection(callback: () => Selection): void {
    this.jsSelection = callback;
  }

  public getHtmlSelection(): Selection {
    return this.htmlSelection();
  }

  public getCssSelection(): Selection {
    return this.cssSelection();
  }

  public getJsSelection(): Selection {
    return this.jsSelection();
  }
}

export default ManageSelection;
