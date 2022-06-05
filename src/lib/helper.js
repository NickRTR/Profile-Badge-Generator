import { toast } from "@zerodevx/svelte-toast";

export function copy(text) {
    navigator.clipboard.writeText(text);
    toast.push("Copied URL to clipboard!");
}