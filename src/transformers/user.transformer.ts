export function userTransformer(data: any) {
    const { password, otp, otpExpireyTime, isVerified, deleted, ...transformedData } = data._doc;
    return transformedData;
}