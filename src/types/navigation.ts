export type RootStackParamList = {
    Home: undefined;
    Map: undefined;
    Submit: {
        latitude: number;
        longitude: number;
    };
    Route: undefined;
    MyPage: undefined;
    SignIn: undefined;
    SignUp: undefined;
    NewProfile: undefined;
    Main: undefined;
    MyPageProfile: undefined;
    MyPageDetail: { snapPostId: string };
    RouteList: undefined;
    RouteDetail: { snapRouteId: string };
    RouteDetailMap: undefined;
    RouteDetailRoute: undefined;
};
