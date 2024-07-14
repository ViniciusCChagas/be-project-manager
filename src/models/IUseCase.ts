export default interface IUseCase<Params, Response> {
    execute(input: Params): Promise<Response>;
}