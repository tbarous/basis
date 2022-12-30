export declare function copyDir(srcDir: string, destDir: string, config?: {
    overwrite: boolean;
    filter: (src: string, dest: string) => void;
}): Promise<void>;
export declare function removeDir(path: string): Promise<void>;
export declare function writeJSONToFile(path: string, object: any): Promise<void>;
export declare function writeToFile(path: string, data: any): Promise<void>;
export declare function makeDir(path: string): Promise<void>;
export declare function moveDir(srcDir: string, destDir: string, config: {
    overwrite: boolean;
    filter: (src: string, dest: string) => void;
}): Promise<void>;
