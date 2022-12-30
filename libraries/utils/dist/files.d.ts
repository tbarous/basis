export declare function copyDir(srcDir: string, destDir: string, config: {
    overwrite: boolean;
    filter: (src: string, dest: string) => void;
}): Promise<void>;
export declare function moveDir(srcDir: string, destDir: string, config: {
    overwrite: boolean;
    filter: (src: string, dest: string) => void;
}): Promise<void>;
