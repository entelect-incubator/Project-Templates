import * as BabelCore from '@babel/core';
import { NodePath as NodePath$1 } from '@babel/core';
import * as t from '@babel/types';
import { z } from 'zod';
import { Scope, NodePath } from '@babel/traverse';

interface Result<T, E> {
    map<U>(fn: (val: T) => U): Result<U, E>;
    mapErr<F>(fn: (val: E) => F): Result<T, F>;
    mapOr<U>(fallback: U, fn: (val: T) => U): U;
    mapOrElse<U>(fallback: () => U, fn: (val: T) => U): U;
    andThen<U>(fn: (val: T) => Result<U, E>): Result<U, E>;
    and<U>(res: Result<U, E>): Result<U, E>;
    or(res: Result<T, E>): Result<T, E>;
    orElse<F>(fn: (val: E) => Result<T, F>): Result<T, F>;
    isOk(): this is OkImpl<T>;
    isErr(): this is ErrImpl<E>;
    expect(msg: string): T;
    expectErr(msg: string): E;
    unwrap(): T;
    unwrapOr(fallback: T): T;
    unwrapOrElse(fallback: (val: E) => T): T;
    unwrapErr(): E;
}
declare class OkImpl<T> implements Result<T, never> {
    private val;
    constructor(val: T);
    map<U>(fn: (val: T) => U): Result<U, never>;
    mapErr<F>(_fn: (val: never) => F): Result<T, F>;
    mapOr<U>(_fallback: U, fn: (val: T) => U): U;
    mapOrElse<U>(_fallback: () => U, fn: (val: T) => U): U;
    andThen<U>(fn: (val: T) => Result<U, never>): Result<U, never>;
    and<U>(res: Result<U, never>): Result<U, never>;
    or(_res: Result<T, never>): Result<T, never>;
    orElse<F>(_fn: (val: never) => Result<T, F>): Result<T, F>;
    isOk(): this is OkImpl<T>;
    isErr(): this is ErrImpl<never>;
    expect(_msg: string): T;
    expectErr(msg: string): never;
    unwrap(): T;
    unwrapOr(_fallback: T): T;
    unwrapOrElse(_fallback: (val: never) => T): T;
    unwrapErr(): never;
}
declare class ErrImpl<E> implements Result<never, E> {
    private val;
    constructor(val: E);
    map<U>(_fn: (val: never) => U): Result<U, E>;
    mapErr<F>(fn: (val: E) => F): Result<never, F>;
    mapOr<U>(fallback: U, _fn: (val: never) => U): U;
    mapOrElse<U>(fallback: () => U, _fn: (val: never) => U): U;
    andThen<U>(_fn: (val: never) => Result<U, E>): Result<U, E>;
    and<U>(_res: Result<U, E>): Result<U, E>;
    or(res: Result<never, E>): Result<never, E>;
    orElse<F>(fn: (val: E) => ErrImpl<F>): Result<never, F>;
    isOk(): this is OkImpl<never>;
    isErr(): this is ErrImpl<E>;
    expect(msg: string): never;
    expectErr(_msg: string): E;
    unwrap(): never;
    unwrapOr<T>(fallback: T): T;
    unwrapOrElse<T>(fallback: (val: E) => T): T;
    unwrapErr(): E;
}

type BuiltInType = PrimitiveType | FunctionType | ObjectType;
type Type = BuiltInType | PhiType | TypeVar | PolyType | PropType | ObjectMethod$1;
type PrimitiveType = {
    kind: 'Primitive';
};
type FunctionType = {
    kind: 'Function';
    shapeId: string | null;
    return: Type;
    isConstructor: boolean;
};
type ObjectType = {
    kind: 'Object';
    shapeId: string | null;
};
type TypeVar = {
    kind: 'Type';
    id: TypeId;
};
type PolyType = {
    kind: 'Poly';
};
type PhiType = {
    kind: 'Phi';
    operands: Array<Type>;
};
type PropType = {
    kind: 'Property';
    objectType: Type;
    objectName: string;
    propertyName: {
        kind: 'literal';
        value: PropertyLiteral;
    } | {
        kind: 'computed';
        value: Type;
    };
};
type ObjectMethod$1 = {
    kind: 'ObjectMethod';
};
declare const opaqueTypeId: unique symbol;
type TypeId = number & {
    [opaqueTypeId]: 'IdentifierId';
};

type HookKind = 'useContext' | 'useState' | 'useActionState' | 'useReducer' | 'useRef' | 'useEffect' | 'useLayoutEffect' | 'useInsertionEffect' | 'useMemo' | 'useCallback' | 'useTransition' | 'useImperativeHandle' | 'Custom';
type FunctionSignature = {
    positionalParams: Array<Effect>;
    restParam: Effect | null;
    returnType: BuiltInType | PolyType;
    returnValueKind: ValueKind;
    returnValueReason?: ValueReason;
    calleeEffect: Effect;
    hookKind: HookKind | null;
    noAlias?: boolean;
    mutableOnlyIfOperandsAreMutable?: boolean;
    impure?: boolean;
    canonicalName?: string;
};

type Global = BuiltInType | PolyType;

declare const ExternalFunctionSchema: z.ZodObject<{
    source: z.ZodString;
    importSpecifierName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    source: string;
    importSpecifierName: string;
}, {
    source: string;
    importSpecifierName: string;
}>;
type ExternalFunction = z.infer<typeof ExternalFunctionSchema>;
type CompilerMode = 'all_features' | 'no_inferred_memo';
declare const HookSchema: z.ZodObject<{
    effectKind: z.ZodNativeEnum<typeof Effect>;
    valueKind: z.ZodNativeEnum<typeof ValueKind>;
    noAlias: z.ZodDefault<z.ZodBoolean>;
    transitiveMixedData: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    noAlias: boolean;
    effectKind: Effect;
    valueKind: ValueKind;
    transitiveMixedData: boolean;
}, {
    effectKind: Effect;
    valueKind: ValueKind;
    noAlias?: boolean | undefined;
    transitiveMixedData?: boolean | undefined;
}>;
type Hook = z.infer<typeof HookSchema>;
declare const EnvironmentConfigSchema: z.ZodObject<{
    customHooks: z.ZodDefault<z.ZodMap<z.ZodString, z.ZodObject<{
        effectKind: z.ZodNativeEnum<typeof Effect>;
        valueKind: z.ZodNativeEnum<typeof ValueKind>;
        noAlias: z.ZodDefault<z.ZodBoolean>;
        transitiveMixedData: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        noAlias: boolean;
        effectKind: Effect;
        valueKind: ValueKind;
        transitiveMixedData: boolean;
    }, {
        effectKind: Effect;
        valueKind: ValueKind;
        noAlias?: boolean | undefined;
        transitiveMixedData?: boolean | undefined;
    }>>>;
    moduleTypeProvider: z.ZodDefault<z.ZodNullable<z.ZodFunction<z.ZodTuple<[z.ZodString], z.ZodUnknown>, z.ZodUnknown>>>;
    customMacros: z.ZodDefault<z.ZodNullable<z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodTuple<[z.ZodString, z.ZodArray<z.ZodUnion<[z.ZodObject<{
        type: z.ZodLiteral<"wildcard">;
    }, "strip", z.ZodTypeAny, {
        type: "wildcard";
    }, {
        type: "wildcard";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"name">;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "name";
        name: string;
    }, {
        type: "name";
        name: string;
    }>]>, "many">], null>]>, "many">>>;
    enableResetCacheOnSourceFileChanges: z.ZodDefault<z.ZodNullable<z.ZodBoolean>>;
    enablePreserveExistingMemoizationGuarantees: z.ZodDefault<z.ZodBoolean>;
    validatePreserveExistingMemoizationGuarantees: z.ZodDefault<z.ZodBoolean>;
    enablePreserveExistingManualUseMemo: z.ZodDefault<z.ZodBoolean>;
    enableForest: z.ZodDefault<z.ZodBoolean>;
    enableUseTypeAnnotations: z.ZodDefault<z.ZodBoolean>;
    enableOptionalDependencies: z.ZodDefault<z.ZodBoolean>;
    enableFire: z.ZodDefault<z.ZodBoolean>;
    inferEffectDependencies: z.ZodDefault<z.ZodNullable<z.ZodArray<z.ZodObject<{
        function: z.ZodObject<{
            source: z.ZodString;
            importSpecifierName: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            source: string;
            importSpecifierName: string;
        }, {
            source: string;
            importSpecifierName: string;
        }>;
        numRequiredArgs: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        function: {
            source: string;
            importSpecifierName: string;
        };
        numRequiredArgs: number;
    }, {
        function: {
            source: string;
            importSpecifierName: string;
        };
        numRequiredArgs: number;
    }>, "many">>>;
    inlineJsxTransform: z.ZodDefault<z.ZodNullable<z.ZodObject<{
        elementSymbol: z.ZodUnion<[z.ZodLiteral<"react.element">, z.ZodLiteral<"react.transitional.element">]>;
        globalDevVar: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        elementSymbol: "react.element" | "react.transitional.element";
        globalDevVar: string;
    }, {
        elementSymbol: "react.element" | "react.transitional.element";
        globalDevVar: string;
    }>>>;
    validateHooksUsage: z.ZodDefault<z.ZodBoolean>;
    validateRefAccessDuringRender: z.ZodDefault<z.ZodBoolean>;
    validateNoSetStateInRender: z.ZodDefault<z.ZodBoolean>;
    validateNoSetStateInPassiveEffects: z.ZodDefault<z.ZodBoolean>;
    validateNoJSXInTryStatements: z.ZodDefault<z.ZodBoolean>;
    validateStaticComponents: z.ZodDefault<z.ZodBoolean>;
    validateMemoizedEffectDependencies: z.ZodDefault<z.ZodBoolean>;
    validateNoCapitalizedCalls: z.ZodDefault<z.ZodNullable<z.ZodArray<z.ZodString, "many">>>;
    validateBlocklistedImports: z.ZodDefault<z.ZodNullable<z.ZodArray<z.ZodString, "many">>>;
    validateNoImpureFunctionsInRender: z.ZodDefault<z.ZodBoolean>;
    enableAssumeHooksFollowRulesOfReact: z.ZodDefault<z.ZodBoolean>;
    enableTransitivelyFreezeFunctionExpressions: z.ZodDefault<z.ZodBoolean>;
    enableEmitFreeze: z.ZodDefault<z.ZodNullable<z.ZodObject<{
        source: z.ZodString;
        importSpecifierName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        source: string;
        importSpecifierName: string;
    }, {
        source: string;
        importSpecifierName: string;
    }>>>;
    enableEmitHookGuards: z.ZodDefault<z.ZodNullable<z.ZodObject<{
        source: z.ZodString;
        importSpecifierName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        source: string;
        importSpecifierName: string;
    }, {
        source: string;
        importSpecifierName: string;
    }>>>;
    enableInstructionReordering: z.ZodDefault<z.ZodBoolean>;
    enableFunctionOutlining: z.ZodDefault<z.ZodBoolean>;
    enableJsxOutlining: z.ZodDefault<z.ZodBoolean>;
    enableEmitInstrumentForget: z.ZodDefault<z.ZodNullable<z.ZodEffects<z.ZodObject<{
        fn: z.ZodObject<{
            source: z.ZodString;
            importSpecifierName: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            source: string;
            importSpecifierName: string;
        }, {
            source: string;
            importSpecifierName: string;
        }>;
        gating: z.ZodNullable<z.ZodObject<{
            source: z.ZodString;
            importSpecifierName: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            source: string;
            importSpecifierName: string;
        }, {
            source: string;
            importSpecifierName: string;
        }>>;
        globalGating: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        fn: {
            source: string;
            importSpecifierName: string;
        };
        gating: {
            source: string;
            importSpecifierName: string;
        } | null;
        globalGating: string | null;
    }, {
        fn: {
            source: string;
            importSpecifierName: string;
        };
        gating: {
            source: string;
            importSpecifierName: string;
        } | null;
        globalGating: string | null;
    }>, {
        fn: {
            source: string;
            importSpecifierName: string;
        };
        gating: {
            source: string;
            importSpecifierName: string;
        } | null;
        globalGating: string | null;
    }, {
        fn: {
            source: string;
            importSpecifierName: string;
        };
        gating: {
            source: string;
            importSpecifierName: string;
        } | null;
        globalGating: string | null;
    }>>>;
    assertValidMutableRanges: z.ZodDefault<z.ZodBoolean>;
    enableChangeVariableCodegen: z.ZodDefault<z.ZodBoolean>;
    enableMemoizationComments: z.ZodDefault<z.ZodBoolean>;
    throwUnknownException__testonly: z.ZodDefault<z.ZodBoolean>;
    enableTreatFunctionDepsAsConditional: z.ZodDefault<z.ZodBoolean>;
    disableMemoizationForDebugging: z.ZodDefault<z.ZodBoolean>;
    enableChangeDetectionForDebugging: z.ZodDefault<z.ZodNullable<z.ZodObject<{
        source: z.ZodString;
        importSpecifierName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        source: string;
        importSpecifierName: string;
    }, {
        source: string;
        importSpecifierName: string;
    }>>>;
    enableCustomTypeDefinitionForReanimated: z.ZodDefault<z.ZodBoolean>;
    hookPattern: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    enableTreatRefLikeIdentifiersAsRefs: z.ZodDefault<z.ZodBoolean>;
    lowerContextAccess: z.ZodDefault<z.ZodNullable<z.ZodObject<{
        source: z.ZodString;
        importSpecifierName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        source: string;
        importSpecifierName: string;
    }, {
        source: string;
        importSpecifierName: string;
    }>>>;
}, "strip", z.ZodTypeAny, {
    customHooks: Map<string, {
        noAlias: boolean;
        effectKind: Effect;
        valueKind: ValueKind;
        transitiveMixedData: boolean;
    }>;
    moduleTypeProvider: ((args_0: string, ...args_1: unknown[]) => unknown) | null;
    customMacros: (string | [string, ({
        type: "wildcard";
    } | {
        type: "name";
        name: string;
    })[]])[] | null;
    enableResetCacheOnSourceFileChanges: boolean | null;
    enablePreserveExistingMemoizationGuarantees: boolean;
    validatePreserveExistingMemoizationGuarantees: boolean;
    enablePreserveExistingManualUseMemo: boolean;
    enableForest: boolean;
    enableUseTypeAnnotations: boolean;
    enableOptionalDependencies: boolean;
    enableFire: boolean;
    inferEffectDependencies: {
        function: {
            source: string;
            importSpecifierName: string;
        };
        numRequiredArgs: number;
    }[] | null;
    inlineJsxTransform: {
        elementSymbol: "react.element" | "react.transitional.element";
        globalDevVar: string;
    } | null;
    validateHooksUsage: boolean;
    validateRefAccessDuringRender: boolean;
    validateNoSetStateInRender: boolean;
    validateNoSetStateInPassiveEffects: boolean;
    validateNoJSXInTryStatements: boolean;
    validateStaticComponents: boolean;
    validateMemoizedEffectDependencies: boolean;
    validateNoCapitalizedCalls: string[] | null;
    validateBlocklistedImports: string[] | null;
    validateNoImpureFunctionsInRender: boolean;
    enableAssumeHooksFollowRulesOfReact: boolean;
    enableTransitivelyFreezeFunctionExpressions: boolean;
    enableEmitFreeze: {
        source: string;
        importSpecifierName: string;
    } | null;
    enableEmitHookGuards: {
        source: string;
        importSpecifierName: string;
    } | null;
    enableInstructionReordering: boolean;
    enableFunctionOutlining: boolean;
    enableJsxOutlining: boolean;
    enableEmitInstrumentForget: {
        fn: {
            source: string;
            importSpecifierName: string;
        };
        gating: {
            source: string;
            importSpecifierName: string;
        } | null;
        globalGating: string | null;
    } | null;
    assertValidMutableRanges: boolean;
    enableChangeVariableCodegen: boolean;
    enableMemoizationComments: boolean;
    throwUnknownException__testonly: boolean;
    enableTreatFunctionDepsAsConditional: boolean;
    disableMemoizationForDebugging: boolean;
    enableChangeDetectionForDebugging: {
        source: string;
        importSpecifierName: string;
    } | null;
    enableCustomTypeDefinitionForReanimated: boolean;
    hookPattern: string | null;
    enableTreatRefLikeIdentifiersAsRefs: boolean;
    lowerContextAccess: {
        source: string;
        importSpecifierName: string;
    } | null;
}, {
    customHooks?: Map<string, {
        effectKind: Effect;
        valueKind: ValueKind;
        noAlias?: boolean | undefined;
        transitiveMixedData?: boolean | undefined;
    }> | undefined;
    moduleTypeProvider?: ((args_0: string, ...args_1: unknown[]) => unknown) | null | undefined;
    customMacros?: (string | [string, ({
        type: "wildcard";
    } | {
        type: "name";
        name: string;
    })[]])[] | null | undefined;
    enableResetCacheOnSourceFileChanges?: boolean | null | undefined;
    enablePreserveExistingMemoizationGuarantees?: boolean | undefined;
    validatePreserveExistingMemoizationGuarantees?: boolean | undefined;
    enablePreserveExistingManualUseMemo?: boolean | undefined;
    enableForest?: boolean | undefined;
    enableUseTypeAnnotations?: boolean | undefined;
    enableOptionalDependencies?: boolean | undefined;
    enableFire?: boolean | undefined;
    inferEffectDependencies?: {
        function: {
            source: string;
            importSpecifierName: string;
        };
        numRequiredArgs: number;
    }[] | null | undefined;
    inlineJsxTransform?: {
        elementSymbol: "react.element" | "react.transitional.element";
        globalDevVar: string;
    } | null | undefined;
    validateHooksUsage?: boolean | undefined;
    validateRefAccessDuringRender?: boolean | undefined;
    validateNoSetStateInRender?: boolean | undefined;
    validateNoSetStateInPassiveEffects?: boolean | undefined;
    validateNoJSXInTryStatements?: boolean | undefined;
    validateStaticComponents?: boolean | undefined;
    validateMemoizedEffectDependencies?: boolean | undefined;
    validateNoCapitalizedCalls?: string[] | null | undefined;
    validateBlocklistedImports?: string[] | null | undefined;
    validateNoImpureFunctionsInRender?: boolean | undefined;
    enableAssumeHooksFollowRulesOfReact?: boolean | undefined;
    enableTransitivelyFreezeFunctionExpressions?: boolean | undefined;
    enableEmitFreeze?: {
        source: string;
        importSpecifierName: string;
    } | null | undefined;
    enableEmitHookGuards?: {
        source: string;
        importSpecifierName: string;
    } | null | undefined;
    enableInstructionReordering?: boolean | undefined;
    enableFunctionOutlining?: boolean | undefined;
    enableJsxOutlining?: boolean | undefined;
    enableEmitInstrumentForget?: {
        fn: {
            source: string;
            importSpecifierName: string;
        };
        gating: {
            source: string;
            importSpecifierName: string;
        } | null;
        globalGating: string | null;
    } | null | undefined;
    assertValidMutableRanges?: boolean | undefined;
    enableChangeVariableCodegen?: boolean | undefined;
    enableMemoizationComments?: boolean | undefined;
    throwUnknownException__testonly?: boolean | undefined;
    enableTreatFunctionDepsAsConditional?: boolean | undefined;
    disableMemoizationForDebugging?: boolean | undefined;
    enableChangeDetectionForDebugging?: {
        source: string;
        importSpecifierName: string;
    } | null | undefined;
    enableCustomTypeDefinitionForReanimated?: boolean | undefined;
    hookPattern?: string | null | undefined;
    enableTreatRefLikeIdentifiersAsRefs?: boolean | undefined;
    lowerContextAccess?: {
        source: string;
        importSpecifierName: string;
    } | null | undefined;
}>;
type EnvironmentConfig = z.infer<typeof EnvironmentConfigSchema>;
declare function parseConfigPragmaForTests(pragma: string, defaults: {
    compilationMode: CompilationMode;
}): PluginOptions;
type PartialEnvironmentConfig = Partial<EnvironmentConfig>;
type ReactFunctionType = 'Component' | 'Hook' | 'Other';
declare class Environment {
    #private;
    logger: Logger | null;
    filename: string | null;
    code: string | null;
    config: EnvironmentConfig;
    fnType: ReactFunctionType;
    compilerMode: CompilerMode;
    programContext: ProgramContext;
    hasFireRewrite: boolean;
    hasInferredEffect: boolean;
    inferredEffectLocations: Set<SourceLocation>;
    constructor(scope: Scope, fnType: ReactFunctionType, compilerMode: CompilerMode, config: EnvironmentConfig, contextIdentifiers: Set<t.Identifier>, logger: Logger | null, filename: string | null, code: string | null, programContext: ProgramContext);
    get isInferredMemoEnabled(): boolean;
    get nextIdentifierId(): IdentifierId;
    get nextBlockId(): BlockId;
    get nextScopeId(): ScopeId;
    get scope(): Scope;
    logErrors(errors: Result<void, CompilerError>): void;
    isContextIdentifier(node: t.Identifier): boolean;
    isHoistedIdentifier(node: t.Identifier): boolean;
    generateGloballyUniqueIdentifierName(name: string | null): ValidatedIdentifier;
    outlineFunction(fn: HIRFunction, type: ReactFunctionType | null): void;
    getOutlinedFunctions(): Array<{
        fn: HIRFunction;
        type: ReactFunctionType | null;
    }>;
    getGlobalDeclaration(binding: NonLocalBinding, loc: SourceLocation): Global | null;
    static knownReactModules: ReadonlyArray<string>;
    getFallthroughPropertyType(receiver: Type, _property: Type): BuiltInType | PolyType | null;
    getPropertyType(receiver: Type, property: string | number): BuiltInType | PolyType | null;
    getFunctionSignature(type: FunctionType): FunctionSignature | null;
    addHoistedIdentifier(node: t.Identifier): void;
}
declare function validateEnvironmentConfig(partialConfig: PartialEnvironmentConfig): EnvironmentConfig;

declare const GeneratedSource: unique symbol;
type SourceLocation = t.SourceLocation | typeof GeneratedSource;
type ReactiveFunction = {
    loc: SourceLocation;
    id: string | null;
    params: Array<Place | SpreadPattern>;
    generator: boolean;
    async: boolean;
    body: ReactiveBlock;
    env: Environment;
    directives: Array<string>;
};
type ReactiveScopeBlock = {
    kind: 'scope';
    scope: ReactiveScope;
    instructions: ReactiveBlock;
};
type PrunedReactiveScopeBlock = {
    kind: 'pruned-scope';
    scope: ReactiveScope;
    instructions: ReactiveBlock;
};
type ReactiveBlock = Array<ReactiveStatement>;
type ReactiveStatement = ReactiveInstructionStatement | ReactiveTerminalStatement | ReactiveScopeBlock | PrunedReactiveScopeBlock;
type ReactiveInstructionStatement = {
    kind: 'instruction';
    instruction: ReactiveInstruction;
};
type ReactiveTerminalStatement<Tterminal extends ReactiveTerminal = ReactiveTerminal> = {
    kind: 'terminal';
    terminal: Tterminal;
    label: {
        id: BlockId;
        implicit: boolean;
    } | null;
};
type ReactiveInstruction = {
    id: InstructionId;
    lvalue: Place | null;
    value: ReactiveValue;
    loc: SourceLocation;
};
type ReactiveValue = InstructionValue | ReactiveLogicalValue | ReactiveSequenceValue | ReactiveTernaryValue | ReactiveOptionalCallValue;
type ReactiveLogicalValue = {
    kind: 'LogicalExpression';
    operator: t.LogicalExpression['operator'];
    left: ReactiveValue;
    right: ReactiveValue;
    loc: SourceLocation;
};
type ReactiveTernaryValue = {
    kind: 'ConditionalExpression';
    test: ReactiveValue;
    consequent: ReactiveValue;
    alternate: ReactiveValue;
    loc: SourceLocation;
};
type ReactiveSequenceValue = {
    kind: 'SequenceExpression';
    instructions: Array<ReactiveInstruction>;
    id: InstructionId;
    value: ReactiveValue;
    loc: SourceLocation;
};
type ReactiveOptionalCallValue = {
    kind: 'OptionalExpression';
    id: InstructionId;
    value: ReactiveValue;
    optional: boolean;
    loc: SourceLocation;
};
type ReactiveTerminal = ReactiveBreakTerminal | ReactiveContinueTerminal | ReactiveReturnTerminal | ReactiveThrowTerminal | ReactiveSwitchTerminal | ReactiveDoWhileTerminal | ReactiveWhileTerminal | ReactiveForTerminal | ReactiveForOfTerminal | ReactiveForInTerminal | ReactiveIfTerminal | ReactiveLabelTerminal | ReactiveTryTerminal;
type ReactiveTerminalTargetKind = 'implicit' | 'labeled' | 'unlabeled';
type ReactiveBreakTerminal = {
    kind: 'break';
    target: BlockId;
    id: InstructionId;
    targetKind: ReactiveTerminalTargetKind;
    loc: SourceLocation;
};
type ReactiveContinueTerminal = {
    kind: 'continue';
    target: BlockId;
    id: InstructionId;
    targetKind: ReactiveTerminalTargetKind;
    loc: SourceLocation;
};
type ReactiveReturnTerminal = {
    kind: 'return';
    value: Place;
    id: InstructionId;
    loc: SourceLocation;
};
type ReactiveThrowTerminal = {
    kind: 'throw';
    value: Place;
    id: InstructionId;
    loc: SourceLocation;
};
type ReactiveSwitchTerminal = {
    kind: 'switch';
    test: Place;
    cases: Array<{
        test: Place | null;
        block: ReactiveBlock | void;
    }>;
    id: InstructionId;
    loc: SourceLocation;
};
type ReactiveDoWhileTerminal = {
    kind: 'do-while';
    loop: ReactiveBlock;
    test: ReactiveValue;
    id: InstructionId;
    loc: SourceLocation;
};
type ReactiveWhileTerminal = {
    kind: 'while';
    test: ReactiveValue;
    loop: ReactiveBlock;
    id: InstructionId;
    loc: SourceLocation;
};
type ReactiveForTerminal = {
    kind: 'for';
    init: ReactiveValue;
    test: ReactiveValue;
    update: ReactiveValue | null;
    loop: ReactiveBlock;
    id: InstructionId;
    loc: SourceLocation;
};
type ReactiveForOfTerminal = {
    kind: 'for-of';
    init: ReactiveValue;
    test: ReactiveValue;
    loop: ReactiveBlock;
    id: InstructionId;
    loc: SourceLocation;
};
type ReactiveForInTerminal = {
    kind: 'for-in';
    init: ReactiveValue;
    loop: ReactiveBlock;
    id: InstructionId;
    loc: SourceLocation;
};
type ReactiveIfTerminal = {
    kind: 'if';
    test: Place;
    consequent: ReactiveBlock;
    alternate: ReactiveBlock | null;
    id: InstructionId;
    loc: SourceLocation;
};
type ReactiveLabelTerminal = {
    kind: 'label';
    block: ReactiveBlock;
    id: InstructionId;
    loc: SourceLocation;
};
type ReactiveTryTerminal = {
    kind: 'try';
    block: ReactiveBlock;
    handlerBinding: Place | null;
    handler: ReactiveBlock;
    id: InstructionId;
    loc: SourceLocation;
};
type HIRFunction = {
    loc: SourceLocation;
    id: string | null;
    fnType: ReactFunctionType;
    env: Environment;
    params: Array<Place | SpreadPattern>;
    returnTypeAnnotation: t.FlowType | t.TSType | null;
    returnType: Type;
    context: Array<Place>;
    effects: Array<FunctionEffect> | null;
    body: HIR;
    generator: boolean;
    async: boolean;
    directives: Array<string>;
};
type FunctionEffect = {
    kind: 'GlobalMutation';
    error: CompilerErrorDetailOptions;
} | {
    kind: 'ReactMutation';
    error: CompilerErrorDetailOptions;
} | {
    kind: 'ContextMutation';
    places: ReadonlySet<Place>;
    effect: Effect;
    loc: SourceLocation;
};
type HIR = {
    entry: BlockId;
    blocks: Map<BlockId, BasicBlock>;
};
type BlockKind = 'block' | 'value' | 'loop' | 'sequence' | 'catch';
type BasicBlock = {
    kind: BlockKind;
    id: BlockId;
    instructions: Array<Instruction>;
    terminal: Terminal;
    preds: Set<BlockId>;
    phis: Set<Phi>;
};
type Terminal = UnsupportedTerminal | UnreachableTerminal | ThrowTerminal | ReturnTerminal | GotoTerminal | IfTerminal | BranchTerminal | SwitchTerminal | ForTerminal | ForOfTerminal | ForInTerminal | DoWhileTerminal | WhileTerminal | LogicalTerminal | TernaryTerminal | OptionalTerminal | LabelTerminal | SequenceTerminal | MaybeThrowTerminal | TryTerminal | ReactiveScopeTerminal | PrunedScopeTerminal;
type UnsupportedTerminal = {
    kind: 'unsupported';
    id: InstructionId;
    loc: SourceLocation;
    fallthrough?: never;
};
type UnreachableTerminal = {
    kind: 'unreachable';
    id: InstructionId;
    loc: SourceLocation;
    fallthrough?: never;
};
type ThrowTerminal = {
    kind: 'throw';
    value: Place;
    id: InstructionId;
    loc: SourceLocation;
    fallthrough?: never;
};
type Case = {
    test: Place | null;
    block: BlockId;
};
type ReturnTerminal = {
    kind: 'return';
    loc: SourceLocation;
    value: Place;
    id: InstructionId;
    fallthrough?: never;
};
type GotoTerminal = {
    kind: 'goto';
    block: BlockId;
    variant: GotoVariant;
    id: InstructionId;
    loc: SourceLocation;
    fallthrough?: never;
};
declare enum GotoVariant {
    Break = "Break",
    Continue = "Continue",
    Try = "Try"
}
type IfTerminal = {
    kind: 'if';
    test: Place;
    consequent: BlockId;
    alternate: BlockId;
    fallthrough: BlockId;
    id: InstructionId;
    loc: SourceLocation;
};
type BranchTerminal = {
    kind: 'branch';
    test: Place;
    consequent: BlockId;
    alternate: BlockId;
    id: InstructionId;
    loc: SourceLocation;
    fallthrough: BlockId;
};
type SwitchTerminal = {
    kind: 'switch';
    test: Place;
    cases: Array<Case>;
    fallthrough: BlockId;
    id: InstructionId;
    loc: SourceLocation;
};
type DoWhileTerminal = {
    kind: 'do-while';
    loop: BlockId;
    test: BlockId;
    fallthrough: BlockId;
    id: InstructionId;
    loc: SourceLocation;
};
type WhileTerminal = {
    kind: 'while';
    loc: SourceLocation;
    test: BlockId;
    loop: BlockId;
    fallthrough: BlockId;
    id: InstructionId;
};
type ForTerminal = {
    kind: 'for';
    loc: SourceLocation;
    init: BlockId;
    test: BlockId;
    update: BlockId | null;
    loop: BlockId;
    fallthrough: BlockId;
    id: InstructionId;
};
type ForOfTerminal = {
    kind: 'for-of';
    loc: SourceLocation;
    init: BlockId;
    test: BlockId;
    loop: BlockId;
    fallthrough: BlockId;
    id: InstructionId;
};
type ForInTerminal = {
    kind: 'for-in';
    loc: SourceLocation;
    init: BlockId;
    loop: BlockId;
    fallthrough: BlockId;
    id: InstructionId;
};
type LogicalTerminal = {
    kind: 'logical';
    operator: t.LogicalExpression['operator'];
    test: BlockId;
    fallthrough: BlockId;
    id: InstructionId;
    loc: SourceLocation;
};
type TernaryTerminal = {
    kind: 'ternary';
    test: BlockId;
    fallthrough: BlockId;
    id: InstructionId;
    loc: SourceLocation;
};
type LabelTerminal = {
    kind: 'label';
    block: BlockId;
    fallthrough: BlockId;
    id: InstructionId;
    loc: SourceLocation;
};
type OptionalTerminal = {
    kind: 'optional';
    optional: boolean;
    test: BlockId;
    fallthrough: BlockId;
    id: InstructionId;
    loc: SourceLocation;
};
type SequenceTerminal = {
    kind: 'sequence';
    block: BlockId;
    fallthrough: BlockId;
    id: InstructionId;
    loc: SourceLocation;
};
type TryTerminal = {
    kind: 'try';
    block: BlockId;
    handlerBinding: Place | null;
    handler: BlockId;
    fallthrough: BlockId;
    id: InstructionId;
    loc: SourceLocation;
};
type MaybeThrowTerminal = {
    kind: 'maybe-throw';
    continuation: BlockId;
    handler: BlockId;
    id: InstructionId;
    loc: SourceLocation;
    fallthrough?: never;
};
type ReactiveScopeTerminal = {
    kind: 'scope';
    fallthrough: BlockId;
    block: BlockId;
    scope: ReactiveScope;
    id: InstructionId;
    loc: SourceLocation;
};
type PrunedScopeTerminal = {
    kind: 'pruned-scope';
    fallthrough: BlockId;
    block: BlockId;
    scope: ReactiveScope;
    id: InstructionId;
    loc: SourceLocation;
};
type Instruction = {
    id: InstructionId;
    lvalue: Place;
    value: InstructionValue;
    loc: SourceLocation;
};
type LValue = {
    place: Place;
    kind: InstructionKind;
};
type LValuePattern = {
    pattern: Pattern;
    kind: InstructionKind;
};
type ArrayExpression = {
    kind: 'ArrayExpression';
    elements: Array<Place | SpreadPattern | Hole>;
    loc: SourceLocation;
};
type Pattern = ArrayPattern | ObjectPattern;
type Hole = {
    kind: 'Hole';
};
type SpreadPattern = {
    kind: 'Spread';
    place: Place;
};
type ArrayPattern = {
    kind: 'ArrayPattern';
    items: Array<Place | SpreadPattern | Hole>;
};
type ObjectPattern = {
    kind: 'ObjectPattern';
    properties: Array<ObjectProperty | SpreadPattern>;
};
type ObjectPropertyKey = {
    kind: 'string';
    name: string;
} | {
    kind: 'identifier';
    name: string;
} | {
    kind: 'computed';
    name: Place;
} | {
    kind: 'number';
    name: number;
};
type ObjectProperty = {
    kind: 'ObjectProperty';
    key: ObjectPropertyKey;
    type: 'property' | 'method';
    place: Place;
};
type LoweredFunction = {
    func: HIRFunction;
};
type ObjectMethod = {
    kind: 'ObjectMethod';
    loc: SourceLocation;
    loweredFunc: LoweredFunction;
};
declare enum InstructionKind {
    Const = "Const",
    Let = "Let",
    Reassign = "Reassign",
    Catch = "Catch",
    HoistedConst = "HoistedConst",
    HoistedLet = "HoistedLet",
    HoistedFunction = "HoistedFunction",
    Function = "Function"
}
type Phi = {
    kind: 'Phi';
    place: Place;
    operands: Map<BlockId, Place>;
};
type ManualMemoDependency = {
    root: {
        kind: 'NamedLocal';
        value: Place;
    } | {
        kind: 'Global';
        identifierName: string;
    };
    path: DependencyPath;
};
type StartMemoize = {
    kind: 'StartMemoize';
    manualMemoId: number;
    deps: Array<ManualMemoDependency> | null;
    loc: SourceLocation;
};
type FinishMemoize = {
    kind: 'FinishMemoize';
    manualMemoId: number;
    decl: Place;
    pruned?: true;
    loc: SourceLocation;
};
type MethodCall = {
    kind: 'MethodCall';
    receiver: Place;
    property: Place;
    args: Array<Place | SpreadPattern>;
    loc: SourceLocation;
};
type CallExpression = {
    kind: 'CallExpression';
    callee: Place;
    args: Array<Place | SpreadPattern>;
    loc: SourceLocation;
    typeArguments?: Array<t.FlowType>;
};
type NewExpression = {
    kind: 'NewExpression';
    callee: Place;
    args: Array<Place | SpreadPattern>;
    loc: SourceLocation;
};
type LoadLocal = {
    kind: 'LoadLocal';
    place: Place;
    loc: SourceLocation;
};
type LoadContext = {
    kind: 'LoadContext';
    place: Place;
    loc: SourceLocation;
};
type InstructionValue = LoadLocal | LoadContext | {
    kind: 'DeclareLocal';
    lvalue: LValue;
    type: t.FlowType | t.TSType | null;
    loc: SourceLocation;
} | {
    kind: 'DeclareContext';
    lvalue: {
        kind: InstructionKind.Let | InstructionKind.HoistedConst | InstructionKind.HoistedLet | InstructionKind.HoistedFunction;
        place: Place;
    };
    loc: SourceLocation;
} | StoreLocal | {
    kind: 'StoreContext';
    lvalue: {
        kind: InstructionKind.Reassign;
        place: Place;
    };
    value: Place;
    loc: SourceLocation;
} | Destructure | {
    kind: 'Primitive';
    value: number | boolean | string | null | undefined;
    loc: SourceLocation;
} | JSXText | {
    kind: 'BinaryExpression';
    operator: Exclude<t.BinaryExpression['operator'], '|>'>;
    left: Place;
    right: Place;
    loc: SourceLocation;
} | NewExpression | CallExpression | MethodCall | {
    kind: 'UnaryExpression';
    operator: Exclude<t.UnaryExpression['operator'], 'throw' | 'delete'>;
    value: Place;
    loc: SourceLocation;
} | ({
    kind: 'TypeCastExpression';
    value: Place;
    type: Type;
    loc: SourceLocation;
} & ({
    typeAnnotation: t.FlowType;
    typeAnnotationKind: 'cast';
} | {
    typeAnnotation: t.TSType;
    typeAnnotationKind: 'as' | 'satisfies';
})) | JsxExpression | {
    kind: 'ObjectExpression';
    properties: Array<ObjectProperty | SpreadPattern>;
    loc: SourceLocation;
} | ObjectMethod | ArrayExpression | {
    kind: 'JsxFragment';
    children: Array<Place>;
    loc: SourceLocation;
} | {
    kind: 'RegExpLiteral';
    pattern: string;
    flags: string;
    loc: SourceLocation;
} | {
    kind: 'MetaProperty';
    meta: string;
    property: string;
    loc: SourceLocation;
} | {
    kind: 'PropertyStore';
    object: Place;
    property: PropertyLiteral;
    value: Place;
    loc: SourceLocation;
} | PropertyLoad | {
    kind: 'PropertyDelete';
    object: Place;
    property: PropertyLiteral;
    loc: SourceLocation;
} | {
    kind: 'ComputedStore';
    object: Place;
    property: Place;
    value: Place;
    loc: SourceLocation;
} | {
    kind: 'ComputedLoad';
    object: Place;
    property: Place;
    loc: SourceLocation;
} | {
    kind: 'ComputedDelete';
    object: Place;
    property: Place;
    loc: SourceLocation;
} | LoadGlobal | StoreGlobal | FunctionExpression | {
    kind: 'TaggedTemplateExpression';
    tag: Place;
    value: {
        raw: string;
        cooked?: string;
    };
    loc: SourceLocation;
} | {
    kind: 'TemplateLiteral';
    subexprs: Array<Place>;
    quasis: Array<{
        raw: string;
        cooked?: string;
    }>;
    loc: SourceLocation;
} | {
    kind: 'Await';
    value: Place;
    loc: SourceLocation;
} | {
    kind: 'GetIterator';
    collection: Place;
    loc: SourceLocation;
} | {
    kind: 'IteratorNext';
    iterator: Place;
    collection: Place;
    loc: SourceLocation;
} | {
    kind: 'NextPropertyOf';
    value: Place;
    loc: SourceLocation;
} | {
    kind: 'PrefixUpdate';
    lvalue: Place;
    operation: t.UpdateExpression['operator'];
    value: Place;
    loc: SourceLocation;
} | {
    kind: 'PostfixUpdate';
    lvalue: Place;
    operation: t.UpdateExpression['operator'];
    value: Place;
    loc: SourceLocation;
} | {
    kind: 'Debugger';
    loc: SourceLocation;
} | StartMemoize | FinishMemoize | {
    kind: 'UnsupportedNode';
    node: t.Node;
    loc: SourceLocation;
};
type JsxExpression = {
    kind: 'JsxExpression';
    tag: Place | BuiltinTag;
    props: Array<JsxAttribute>;
    children: Array<Place> | null;
    loc: SourceLocation;
    openingLoc: SourceLocation;
    closingLoc: SourceLocation;
};
type JsxAttribute = {
    kind: 'JsxSpreadAttribute';
    argument: Place;
} | {
    kind: 'JsxAttribute';
    name: string;
    place: Place;
};
type FunctionExpression = {
    kind: 'FunctionExpression';
    name: string | null;
    loweredFunc: LoweredFunction;
    type: 'ArrowFunctionExpression' | 'FunctionExpression' | 'FunctionDeclaration';
    loc: SourceLocation;
};
type Destructure = {
    kind: 'Destructure';
    lvalue: LValuePattern;
    value: Place;
    loc: SourceLocation;
};
type Place = {
    kind: 'Identifier';
    identifier: Identifier;
    effect: Effect;
    reactive: boolean;
    loc: SourceLocation;
};
type JSXText = {
    kind: 'JSXText';
    value: string;
    loc: SourceLocation;
};
type StoreLocal = {
    kind: 'StoreLocal';
    lvalue: LValue;
    value: Place;
    type: t.FlowType | t.TSType | null;
    loc: SourceLocation;
};
type PropertyLoad = {
    kind: 'PropertyLoad';
    object: Place;
    property: PropertyLiteral;
    loc: SourceLocation;
};
type LoadGlobal = {
    kind: 'LoadGlobal';
    binding: NonLocalBinding;
    loc: SourceLocation;
};
type StoreGlobal = {
    kind: 'StoreGlobal';
    name: string;
    value: Place;
    loc: SourceLocation;
};
type BuiltinTag = {
    kind: 'BuiltinTag';
    name: string;
    loc: SourceLocation;
};
type MutableRange = {
    start: InstructionId;
    end: InstructionId;
};
type NonLocalImportSpecifier = {
    kind: 'ImportSpecifier';
    name: string;
    module: string;
    imported: string;
};
type NonLocalBinding = {
    kind: 'ImportDefault';
    name: string;
    module: string;
} | {
    kind: 'ImportNamespace';
    name: string;
    module: string;
} | NonLocalImportSpecifier | {
    kind: 'ModuleLocal';
    name: string;
} | {
    kind: 'Global';
    name: string;
};
type Identifier = {
    id: IdentifierId;
    declarationId: DeclarationId;
    name: IdentifierName | null;
    mutableRange: MutableRange;
    scope: ReactiveScope | null;
    type: Type;
    loc: SourceLocation;
};
type IdentifierName = ValidatedIdentifier | PromotedIdentifier;
type ValidatedIdentifier = {
    kind: 'named';
    value: ValidIdentifierName;
};
type PromotedIdentifier = {
    kind: 'promoted';
    value: string;
};
declare const opaqueValidIdentifierName: unique symbol;
type ValidIdentifierName = string & {
    [opaqueValidIdentifierName]: 'ValidIdentifierName';
};
declare enum ValueReason {
    Global = "global",
    JsxCaptured = "jsx-captured",
    KnownReturnSignature = "known-return-signature",
    Context = "context",
    State = "state",
    ReducerState = "reducer-state",
    ReactiveFunctionArgument = "reactive-function-argument",
    Other = "other"
}
declare enum ValueKind {
    MaybeFrozen = "maybefrozen",
    Frozen = "frozen",
    Primitive = "primitive",
    Global = "global",
    Mutable = "mutable",
    Context = "context"
}
declare enum Effect {
    Unknown = "<unknown>",
    Freeze = "freeze",
    Read = "read",
    Capture = "capture",
    ConditionallyMutateIterator = "mutate-iterator?",
    ConditionallyMutate = "mutate?",
    Mutate = "mutate",
    Store = "store"
}
type ReactiveScope = {
    id: ScopeId;
    range: MutableRange;
    dependencies: ReactiveScopeDependencies;
    declarations: Map<IdentifierId, ReactiveScopeDeclaration>;
    reassignments: Set<Identifier>;
    earlyReturnValue: {
        value: Identifier;
        loc: SourceLocation;
        label: BlockId;
    } | null;
    merged: Set<ScopeId>;
    loc: SourceLocation;
};
type ReactiveScopeDependencies = Set<ReactiveScopeDependency>;
type ReactiveScopeDeclaration = {
    identifier: Identifier;
    scope: ReactiveScope;
};
declare const opaquePropertyLiteral: unique symbol;
type PropertyLiteral = (string | number) & {
    [opaquePropertyLiteral]: 'PropertyLiteral';
};
type DependencyPathEntry = {
    property: PropertyLiteral;
    optional: boolean;
};
type DependencyPath = Array<DependencyPathEntry>;
type ReactiveScopeDependency = {
    identifier: Identifier;
    path: DependencyPath;
};
declare const opaqueBlockId: unique symbol;
type BlockId = number & {
    [opaqueBlockId]: 'BlockId';
};
declare const opaqueScopeId: unique symbol;
type ScopeId = number & {
    [opaqueScopeId]: 'ScopeId';
};
declare const opaqueIdentifierId: unique symbol;
type IdentifierId = number & {
    [opaqueIdentifierId]: 'IdentifierId';
};
declare const opageDeclarationId: unique symbol;
type DeclarationId = number & {
    [opageDeclarationId]: 'DeclarationId';
};
declare const opaqueInstructionId: unique symbol;
type InstructionId = number & {
    [opaqueInstructionId]: 'IdentifierId';
};

type Options = {
    indent: number;
};
declare function printFunctionWithOutlined(fn: HIRFunction): string;
declare function printHIR(ir: HIR, options?: Options | null): string;

declare enum ErrorSeverity {
    InvalidJS = "InvalidJS",
    InvalidReact = "InvalidReact",
    InvalidConfig = "InvalidConfig",
    CannotPreserveMemoization = "CannotPreserveMemoization",
    Todo = "Todo",
    Invariant = "Invariant"
}
declare enum CompilerSuggestionOperation {
    InsertBefore = 0,
    InsertAfter = 1,
    Remove = 2,
    Replace = 3
}
type CompilerSuggestion = {
    op: CompilerSuggestionOperation.InsertAfter | CompilerSuggestionOperation.InsertBefore | CompilerSuggestionOperation.Replace;
    range: [number, number];
    description: string;
    text: string;
} | {
    op: CompilerSuggestionOperation.Remove;
    range: [number, number];
    description: string;
};
type CompilerErrorDetailOptions = {
    reason: string;
    description?: string | null | undefined;
    severity: ErrorSeverity;
    loc: SourceLocation | null;
    suggestions?: Array<CompilerSuggestion> | null | undefined;
};
declare class CompilerErrorDetail {
    options: CompilerErrorDetailOptions;
    constructor(options: CompilerErrorDetailOptions);
    get reason(): CompilerErrorDetailOptions['reason'];
    get description(): CompilerErrorDetailOptions['description'];
    get severity(): CompilerErrorDetailOptions['severity'];
    get loc(): CompilerErrorDetailOptions['loc'];
    get suggestions(): CompilerErrorDetailOptions['suggestions'];
    printErrorMessage(): string;
    toString(): string;
}
declare class CompilerError extends Error {
    details: Array<CompilerErrorDetail>;
    static invariant(condition: unknown, options: Omit<CompilerErrorDetailOptions, 'severity'>): asserts condition;
    static throwTodo(options: Omit<CompilerErrorDetailOptions, 'severity'>): never;
    static throwInvalidJS(options: Omit<CompilerErrorDetailOptions, 'severity'>): never;
    static throwInvalidReact(options: Omit<CompilerErrorDetailOptions, 'severity'>): never;
    static throwInvalidConfig(options: Omit<CompilerErrorDetailOptions, 'severity'>): never;
    static throw(options: CompilerErrorDetailOptions): never;
    constructor(...args: Array<any>);
    get message(): string;
    set message(_message: string);
    toString(): string;
    push(options: CompilerErrorDetailOptions): CompilerErrorDetail;
    pushErrorDetail(detail: CompilerErrorDetail): CompilerErrorDetail;
    hasErrors(): boolean;
    asResult(): Result<void, CompilerError>;
    isCritical(): boolean;
}

type CodegenFunction = {
    type: 'CodegenFunction';
    id: t.Identifier | null;
    params: t.FunctionDeclaration['params'];
    body: t.BlockStatement;
    generator: boolean;
    async: boolean;
    loc: SourceLocation;
    memoSlotsUsed: number;
    memoBlocks: number;
    memoValues: number;
    prunedMemoBlocks: number;
    prunedMemoValues: number;
    outlined: Array<{
        fn: CodegenFunction;
        type: ReactFunctionType | null;
    }>;
    hasInferredEffect: boolean;
    inferredEffectLocations: Set<SourceLocation>;
    hasFireRewrite: boolean;
};

declare function printReactiveFunctionWithOutlined(fn: ReactiveFunction): string;
declare function printReactiveFunction(fn: ReactiveFunction): string;

type CompilerPipelineValue = {
    kind: 'ast';
    name: string;
    value: CodegenFunction;
} | {
    kind: 'hir';
    name: string;
    value: HIRFunction;
} | {
    kind: 'reactive';
    name: string;
    value: ReactiveFunction;
} | {
    kind: 'debug';
    name: string;
    value: string;
};
declare function compileFn(func: NodePath<t.FunctionDeclaration | t.ArrowFunctionExpression | t.FunctionExpression>, config: EnvironmentConfig, fnType: ReactFunctionType, mode: CompilerMode, programContext: ProgramContext, logger: Logger | null, filename: string | null, code: string | null): CodegenFunction;

declare const PanicThresholdOptionsSchema: z.ZodEnum<["all_errors", "critical_errors", "none"]>;
type PanicThresholdOptions = z.infer<typeof PanicThresholdOptionsSchema>;
type PluginOptions = {
    environment: EnvironmentConfig;
    logger: Logger | null;
    gating: ExternalFunction | null;
    panicThreshold: PanicThresholdOptions;
    noEmit: boolean;
    compilationMode: CompilationMode;
    eslintSuppressionRules?: Array<string> | null | undefined;
    flowSuppressions: boolean;
    ignoreUseNoForget: boolean;
    sources?: Array<string> | ((filename: string) => boolean) | null;
    enableReanimatedCheck: boolean;
    target: CompilerReactTarget;
};
declare const CompilerReactTargetSchema: z.ZodUnion<[z.ZodLiteral<"17">, z.ZodLiteral<"18">, z.ZodLiteral<"19">, z.ZodObject<{
    kind: z.ZodLiteral<"donotuse_meta_internal">;
    runtimeModule: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    kind: "donotuse_meta_internal";
    runtimeModule: string;
}, {
    kind: "donotuse_meta_internal";
    runtimeModule?: string | undefined;
}>]>;
type CompilerReactTarget = z.infer<typeof CompilerReactTargetSchema>;
declare const CompilationModeSchema: z.ZodEnum<["infer", "syntax", "annotation", "all"]>;
type CompilationMode = z.infer<typeof CompilationModeSchema>;
type LoggerEvent = CompileSuccessEvent | CompileErrorEvent | CompileDiagnosticEvent | CompileSkipEvent | PipelineErrorEvent | TimingEvent;
type CompileErrorEvent = {
    kind: 'CompileError';
    fnLoc: t.SourceLocation | null;
    detail: CompilerErrorDetailOptions;
};
type CompileDiagnosticEvent = {
    kind: 'CompileDiagnostic';
    fnLoc: t.SourceLocation | null;
    detail: Omit<Omit<CompilerErrorDetailOptions, 'severity'>, 'suggestions'>;
};
type CompileSuccessEvent = {
    kind: 'CompileSuccess';
    fnLoc: t.SourceLocation | null;
    fnName: string | null;
    memoSlots: number;
    memoBlocks: number;
    memoValues: number;
    prunedMemoBlocks: number;
    prunedMemoValues: number;
};
type CompileSkipEvent = {
    kind: 'CompileSkip';
    fnLoc: t.SourceLocation | null;
    reason: string;
    loc: t.SourceLocation | null;
};
type PipelineErrorEvent = {
    kind: 'PipelineError';
    fnLoc: t.SourceLocation | null;
    data: string;
};
type TimingEvent = {
    kind: 'Timing';
    measurement: PerformanceMeasure;
};
type Logger = {
    logEvent: (filename: string | null, event: LoggerEvent) => void;
    debugLogIRs?: (value: CompilerPipelineValue) => void;
};
declare function parsePluginOptions(obj: unknown): PluginOptions;

declare class ProgramContext {
    scope: Scope;
    reactRuntimeModule: string;
    hookPattern: string | null;
    knownReferencedNames: Set<string>;
    imports: Map<string, Map<string, NonLocalImportSpecifier>>;
    constructor(program: NodePath$1<t.Program>, reactRuntimeModule: CompilerReactTarget, hookPattern: string | null);
    isHookName(name: string): boolean;
    hasReference(name: string): boolean;
    newUid(name: string): string;
    addMemoCacheImport(): NonLocalImportSpecifier;
    addImportSpecifier({ source: module, importSpecifierName: specifier }: ExternalFunction, nameHint?: string): NonLocalImportSpecifier;
    addNewReference(name: string): void;
    assertGlobalBinding(name: string, localScope?: Scope): Result<void, CompilerError>;
}

type CompilerPass = {
    opts: PluginOptions;
    filename: string | null;
    comments: Array<t.CommentBlock | t.CommentLine>;
    code: string | null;
};
declare const OPT_IN_DIRECTIVES: Set<string>;
declare const OPT_OUT_DIRECTIVES: Set<string>;
declare function findDirectiveEnablingMemoization(directives: Array<t.Directive>): Array<t.Directive>;
declare function findDirectiveDisablingMemoization(directives: Array<t.Directive>): Array<t.Directive>;
type BabelFn = NodePath$1<t.FunctionDeclaration> | NodePath$1<t.FunctionExpression> | NodePath$1<t.ArrowFunctionExpression>;
type CompileProgramResult = {
    retryErrors: Array<{
        fn: BabelFn;
        error: CompilerError;
    }>;
    inferredEffectLocations: Set<t.SourceLocation>;
};
declare function compileProgram(program: NodePath$1<t.Program>, pass: CompilerPass): CompileProgramResult | null;

declare function runBabelPluginReactCompiler(text: string, file: string, language: 'flow' | 'typescript', options: Partial<PluginOptions> | null, includeAst?: boolean): BabelCore.BabelFileResult;

declare function BabelPluginReactCompiler(_babel: typeof BabelCore): BabelCore.PluginObj;

declare global {
    let __DEV__: boolean | null | undefined;
}

export { CompilerError, CompilerErrorDetail, type CompilerErrorDetailOptions, type CompilerPipelineValue, CompilerSuggestionOperation, Effect, type EnvironmentConfig, ErrorSeverity, type ExternalFunction, type Hook, type Logger, type LoggerEvent, OPT_IN_DIRECTIVES, OPT_OUT_DIRECTIVES, type PluginOptions, ProgramContext, type SourceLocation, ValueKind, compileFn as compile, compileProgram, BabelPluginReactCompiler as default, findDirectiveDisablingMemoization, findDirectiveEnablingMemoization, parseConfigPragmaForTests, parsePluginOptions, printFunctionWithOutlined, printHIR, printReactiveFunction, printReactiveFunctionWithOutlined, runBabelPluginReactCompiler, validateEnvironmentConfig };
