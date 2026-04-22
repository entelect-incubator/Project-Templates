global using System;
global using System.Threading;
global using System.Threading.Tasks;
global using Bogus;
global using DatabaseContext = Infrastructure.DatabaseContext;
global using Microsoft.Extensions.Configuration;
global using NUnit.Framework;
global using OrderStatus = Domain.V1.Orders.OrderStatus;
global using Test.Setup;